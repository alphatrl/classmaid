import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getSchoolContent,
  getSchoolLinks,
  getSchools,
  getSiteContent,
} from '../getContent';
import { getSchoolGuides } from '../guides';

vi.mock('../guides', () => ({ getSchoolGuides: vi.fn() }));

describe('getContent', () => {
  beforeEach(() => {
    vi.mocked(getSchoolGuides).mockResolvedValue({
      guides: [{ title: 'G', icon: '', guides: [], categories: [] }],
      meta: { guides_note: 'Note', site_title: 'From sheet' },
      status: 'ok',
    });
  });

  it('lists enabled schools without bookmarks, links or meta', () => {
    const [smu] = getSchools();
    expect(smu.slug).toBe('smu');
    expect(Object.keys(smu).sort()).toEqual(
      [
        'calendar',
        'colors',
        'enabled',
        'features',
        'lms',
        'name',
        'shortName',
        'slug',
        'sso',
      ].sort()
    );
  });

  it('returns site links and meta', () => {
    const site = getSiteContent();
    expect(site.links.github).toBeDefined();
    expect(site.meta.site_title).toBe('Classmaid');
  });

  it('returns null for an unknown school', async () => {
    expect(await getSchoolContent('nope')).toBeNull();
    expect(getSchoolLinks('nope')).toBeNull();
    expect(getSchoolGuides).not.toHaveBeenCalledWith('nope');
  });

  it('merges global and school links, and meta with guides meta last', async () => {
    const content = await getSchoolContent('smu');
    expect(content?.bookmarks.length).toBeGreaterThan(0);
    expect(content?.links.github).toBeDefined();
    expect(content?.links.library).toBeDefined();
    expect(content?.meta.lks_image_author).toBeDefined();
    expect(content?.meta.guides_note).toBe('Note');
    expect(content?.meta.site_title).toBe('From sheet');
    expect(content?.guidesStatus).toBe('ok');
    expect(content?.guides).toHaveLength(1);
  });

  it('passes through an unavailable guides status', async () => {
    vi.mocked(getSchoolGuides).mockResolvedValue({
      guides: [],
      meta: {},
      status: 'unavailable',
    });
    const content = await getSchoolContent('smu');
    expect(content?.guidesStatus).toBe('unavailable');
    expect(content?.guides).toEqual([]);
    expect(content?.bookmarks.length).toBeGreaterThan(0);
  });
});
