import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  __resetGuidesForTests,
  CACHE_TTL_MS,
  getSchoolGuides,
  invalidateGuides,
  refreshGuides,
  RETRY_AFTER_FAILURE_MS,
} from '../guides';
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
};

// eslint-disable-next-line no-unused-vars -- base rule misreads type-signature params
const fetchSpreadsheet = vi.fn<(id: string) => Promise<SheetValues>>();

describe('guides loader', () => {
  beforeEach(() => {
    __resetGuidesForTests();
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
    const first = await getSchoolGuides('smu');
    await getSchoolGuides('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(1);
    expect(fetchSpreadsheet).toHaveBeenCalledWith('guides-sheet');
    expect(first.status).toBe('ok');
    expect(first.guides[0].guides[0].title).toBe('Eduroam');
    expect(first.meta).toEqual({ guides_note: 'Note' });
  });

  it('returns no guides but ok for a school without a tab', async () => {
    expect(await getSchoolGuides('nus')).toEqual({
      guides: [],
      meta: {},
      status: 'ok',
    });
  });

  it('refetches after the TTL', async () => {
    await getSchoolGuides('smu');
    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);
    await getSchoolGuides('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(2);
  });

  it('serves last-good data when a later fetch fails, then backs off', async () => {
    await getSchoolGuides('smu');
    vi.setSystemTime(Date.now() + CACHE_TTL_MS + 1);
    fetchSpreadsheet.mockRejectedValue(new Error('boom'));
    const stale = await getSchoolGuides('smu');
    expect(stale.status).toBe('ok');
    expect(stale.guides).toHaveLength(1);
    await getSchoolGuides('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(2);
    vi.setSystemTime(Date.now() + RETRY_AFTER_FAILURE_MS + 1);
    await getSchoolGuides('smu');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(3);
  });

  it('is unavailable with no guides when the first fetch fails', async () => {
    fetchSpreadsheet.mockRejectedValue(new Error('boom'));
    expect(await getSchoolGuides('smu')).toEqual({
      guides: [],
      meta: {},
      status: 'unavailable',
    });
  });

  it('is unavailable without credentials, warning once', async () => {
    vi.mocked(getSheetsClient).mockResolvedValue(null);
    expect((await getSchoolGuides('smu')).status).toBe('unavailable');
    expect((await getSchoolGuides('smu')).status).toBe('unavailable');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('is unavailable without SHEET_ID_GUIDES', async () => {
    vi.stubEnv('SHEET_ID_GUIDES', '');
    expect((await getSchoolGuides('smu')).status).toBe('unavailable');
    expect(fetchSpreadsheet).not.toHaveBeenCalled();
  });

  it('invalidateGuides and refreshGuides force a refetch', async () => {
    await getSchoolGuides('smu');
    invalidateGuides();
    await getSchoolGuides('smu');
    expect(await refreshGuides()).toBe('ok');
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(3);
  });

  it('shares one fetch between concurrent calls', async () => {
    await Promise.all([
      getSchoolGuides('smu'),
      getSchoolGuides('smu'),
      getSchoolGuides('nus'),
    ]);
    expect(fetchSpreadsheet).toHaveBeenCalledTimes(1);
  });
});
