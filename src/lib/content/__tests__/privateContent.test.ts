import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  __resetPrivateContentForTests,
  CACHE_TTL_MS,
  getPrivateContent,
  invalidatePrivateContent,
  refreshPrivateContent,
  RETRY_AFTER_FAILURE_MS,
} from '../privateContent';
import { getSheetsClient } from '../sheets';
import type { SheetValues } from '../types';

vi.mock('../sheets', () => ({ getSheetsClient: vi.fn() }));

const HEADER = [
  'group',
  'group_icon',
  'category',
  'category_icon',
  'title',
  'link',
  'description',
  'enabled',
];

const VALUES: SheetValues = {
  smu: [
    HEADER,
    ['Newcomers', 'sparkles', '', '', 'Eduroam', 'https://e', '', 'TRUE'],
  ],
  meta: [
    ['school', 'key', 'value'],
    ['smu', 'guides_note', 'Note'],
  ],
  links: [
    ['school', 'key', 'url', 'label'],
    ['', 'feedback', 'https://forms.example/feedback', 'Make a suggestion'],
    ['', 'contact_us', 'https://forms.example/contact', ''],
    ['smu', 'smusa_feedback', 'https://forms.example/smusa', ''],
    ['smu', 'contact_us', 'https://forms.example/smu-contact', ''],
  ],
};

// eslint-disable-next-line no-unused-vars -- base rule misreads type-signature params
const fetchSpreadsheet = vi.fn<(id: string) => Promise<SheetValues>>();

describe('private content loader', () => {
  beforeEach(() => {
    __resetPrivateContentForTests();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    vi.stubEnv('SHEET_ID_GUIDES', 'guides-sheet');
    fetchSpreadsheet.mockReset().mockResolvedValue(VALUES);
    vi.mocked(getSheetsClient).mockResolvedValue({ fetchSpreadsheet });
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('serves the sheet and caches within the TTL', async () => {
    const first = await getPrivateContent('smu');
    await getPrivateContent('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(1);
    expect(fetchSpreadsheet).toHaveBeenCalledWith('guides-sheet');
    expect(first.status).toBe('ok');
    expect(first.guides[0].guides[0].title).toBe('Eduroam');
    expect(first.meta).toEqual({ guides_note: 'Note' });
    expect(first.links).toEqual({
      feedback: {
        url: 'https://forms.example/feedback',
        label: 'Make a suggestion',
      },
      contact_us: { url: 'https://forms.example/smu-contact' },
      smusa_feedback: { url: 'https://forms.example/smusa' },
    });
  });

  it('returns only global links and meta without a school', async () => {
    const global = await getPrivateContent();
    expect(global.guides).toEqual([]);
    expect(Object.keys(global.links)).toEqual(['feedback', 'contact_us']);
    expect(global.links.contact_us.url).toBe('https://forms.example/contact');
    expect(global.meta).toEqual({});
  });

  it('returns no guides but global links for a school without a tab', async () => {
    const nus = await getPrivateContent('nus');
    expect(nus.guides).toEqual([]);
    expect(nus.meta).toEqual({});
    expect(Object.keys(nus.links)).toEqual(['feedback', 'contact_us']);
    expect(nus.status).toBe('ok');
  });

  it('refetches after the TTL', async () => {
    await getPrivateContent('smu');
    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);
    await getPrivateContent('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(2);
  });

  it('serves last-good data when a later fetch fails, then backs off', async () => {
    await getPrivateContent('smu');
    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);
    fetchSpreadsheet.mockRejectedValue(new Error('boom'));
    const stale = await getPrivateContent('smu');
    expect(stale.status).toBe('ok');
    expect(stale.guides).toHaveLength(1);
    await getPrivateContent('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(2);
    vi.setSystemTime(Date.now() + RETRY_AFTER_FAILURE_MS + 1);
    await getPrivateContent('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(3);
  });

  it('is unavailable with no guides when the first fetch fails', async () => {
    fetchSpreadsheet.mockRejectedValue(new Error('boom'));
    expect(await getPrivateContent('smu')).toEqual({
      guides: [],
      links: {},
      meta: {},
      status: 'unavailable',
    });
  });

  it('is unavailable without credentials, warning once', async () => {
    vi.mocked(getSheetsClient).mockResolvedValue(null);
    expect((await getPrivateContent('smu')).status).toBe('unavailable');
    expect((await getPrivateContent('smu')).status).toBe('unavailable');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('is unavailable without SHEET_ID_GUIDES', async () => {
    vi.stubEnv('SHEET_ID_GUIDES', '');
    expect((await getPrivateContent('smu')).status).toBe('unavailable');
    expect(fetchSpreadsheet).not.toHaveBeenCalled();
  });

  it('invalidatePrivateContent and refreshPrivateContent force a refetch', async () => {
    await getPrivateContent('smu');
    invalidatePrivateContent();
    await getPrivateContent('smu');
    expect(await refreshPrivateContent()).toBe('ok');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(3);
  });

  it('shares one fetch between concurrent calls', async () => {
    await Promise.all([
      getPrivateContent('smu'),
      getPrivateContent('smu'),
      getPrivateContent('nus'),
    ]);
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(1);
  });
});
