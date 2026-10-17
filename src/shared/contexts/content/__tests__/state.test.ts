import { describe, expect, it } from 'vitest';

import {
  contentKey,
  contentReducer,
  filterBookmarksByFeatures,
  getSchoolSlugFromPath,
  getSectionRootPath,
  INITIAL_CONTENT_STATE,
  isFeatureEnabled,
  selectContent,
  selectHomeBookmarks,
} from '../state';

const bookmark = (
  id: string,
  extra: Partial<Content.Bookmark> = {}
): Content.Bookmark => ({
  id,
  title: id,
  icon: 'globe',
  color: '#000000',
  type: 'url',
  link: `https://example.com/${id}`,
  ...extra,
});

const SECTIONS: Content.Section[] = [
  { id: 'home', title: 'Home', showOnHome: true, items: [bookmark('a')] },
  {
    id: 'tools',
    title: 'Tools',
    showOnHome: false,
    items: [
      bookmark('export', { type: 'internal', link: 'boss-export' }),
      bookmark('guides', { type: 'guides', link: undefined }),
    ],
  },
  {
    id: 'only_export',
    title: 'Export',
    showOnHome: true,
    items: [bookmark('export2', { type: 'internal', link: 'boss-export' })],
  },
];

const schoolPayload = (
  features: string[],
  sheetStatus: Content.SheetStatus = 'unavailable'
): Content.SchoolPayload => ({
  school: {
    slug: 'test',
    name: 'Test University',
    shortName: 'TU',
    enabled: true,
    sso: { domain: 'example.com' },
    lms: { name: 'LMS', url: 'https://lms.example.com' },
    calendar: { semestersKey: 'TU', importantDatesKey: 'TU' },
    colors: { accent: '#123456' },
    features,
  },
  bookmarks: SECTIONS,
  guides: [],
  sheetStatus,
  links: { github: { url: 'https://example.com/repo' } },
  meta: { about_text: 'About' },
  omittedBookmarks: [],
});

describe('path helpers', () => {
  it('derives the school slug from the first path segment', () => {
    expect(getSchoolSlugFromPath('/smu')).toBe('smu');
    expect(getSchoolSlugFromPath('/SMU/calendar')).toBe('smu');
    expect(getSchoolSlugFromPath('/')).toBeNull();
    expect(getSchoolSlugFromPath('/[school]')).toBeNull();
  });

  it('derives the section root path', () => {
    expect(getSectionRootPath('/smu/calendar')).toBe('/smu');
    expect(getSectionRootPath('/')).toBe('/');
  });

  it('maps a slug to its API path', () => {
    expect(contentKey('smu')).toBe('/api/content/smu/all');
    expect(contentKey(null)).toBe('/api/content/site');
  });
});

describe('contentReducer', () => {
  it('stores the payload with its request key and clears errors', () => {
    const failed = contentReducer(INITIAL_CONTENT_STATE, {
      type: 'failure',
      key: contentKey('test'),
      error: 'HTTP 503',
    });
    expect(failed).toEqual({
      key: '/api/content/test/all',
      payload: null,
      error: 'HTTP 503',
    });

    const payload = schoolPayload([]);
    const ok = contentReducer(failed, {
      type: 'success',
      key: contentKey('test'),
      payload,
    });
    expect(ok).toEqual({ key: '/api/content/test/all', payload, error: null });
  });
});

describe('selectContent', () => {
  it('is loading with empty values before the first response', () => {
    const value = selectContent(INITIAL_CONTENT_STATE, 'test');
    expect(value).toMatchObject({
      slug: 'test',
      school: null,
      bookmarks: [],
      guides: [],
      links: {},
      meta: {},
      features: null,
      sheetStatus: null,
      loading: true,
      error: null,
    });
  });

  it('exposes the school payload for the current slug', () => {
    const state = contentReducer(INITIAL_CONTENT_STATE, {
      type: 'success',
      key: contentKey('test'),
      payload: schoolPayload(['boss_export']),
    });
    const value = selectContent(state, 'test');
    expect(value.loading).toBe(false);
    expect(value.school?.slug).toBe('test');
    expect(value.features).toEqual(['boss_export']);
    expect(value.sheetStatus).toBe('unavailable');
    expect(value.links.github?.url).toBe('https://example.com/repo');
    expect(value.meta.about_text).toBe('About');
    expect(value.bookmarks.map((s) => s.id)).toEqual([
      'home',
      'tools',
      'only_export',
    ]);
  });

  it('treats data of another slug as loading', () => {
    const state = contentReducer(INITIAL_CONTENT_STATE, {
      type: 'success',
      key: contentKey('other'),
      payload: schoolPayload([]),
    });
    const value = selectContent(state, 'test');
    expect(value.loading).toBe(true);
    expect(value.school).toBeNull();
  });

  it('reports errors of the current slug', () => {
    const state = contentReducer(INITIAL_CONTENT_STATE, {
      type: 'failure',
      key: contentKey('test'),
      error: 'HTTP 404',
    });
    expect(selectContent(state, 'test')).toMatchObject({
      loading: false,
      error: 'HTTP 404',
      features: null,
      bookmarks: [],
    });
  });

  it('exposes links and meta of the site payload on pages without a school', () => {
    const state = contentReducer(INITIAL_CONTENT_STATE, {
      type: 'success',
      key: contentKey(null),
      payload: {
        links: { feedback: { url: 'https://example.com/form' } },
        meta: {},
        sheetStatus: 'ok',
      },
    });
    const value = selectContent(state, null);
    expect(value.school).toBeNull();
    expect(value.links.feedback?.url).toBe('https://example.com/form');
    expect(value.sheetStatus).toBe('ok');
  });
});

describe('features', () => {
  it('counts every feature as on while unknown', () => {
    expect(isFeatureEnabled(null, 'library_occupancy')).toBe(true);
    expect(isFeatureEnabled([], 'library_occupancy')).toBe(false);
    expect(isFeatureEnabled(['library_occupancy'], 'library_occupancy')).toBe(
      true
    );
  });

  it('drops the BOSS export bookmark and empty sections without boss_export', () => {
    const filtered = filterBookmarksByFeatures(SECTIONS, ['calendar']);
    expect(filtered.map((s) => s.id)).toEqual(['home', 'tools']);
    expect(filtered[1].items.map((i) => i.id)).toEqual(['guides']);
    expect(filterBookmarksByFeatures(SECTIONS, ['boss_export'])).toEqual(
      SECTIONS
    );
    expect(filterBookmarksByFeatures(SECTIONS, null)).toEqual(SECTIONS);
  });

  it('selects the bookmarks of showOnHome sections in order', () => {
    expect(selectHomeBookmarks(SECTIONS).map((b) => b.id)).toEqual([
      'a',
      'export2',
    ]);
  });
});
