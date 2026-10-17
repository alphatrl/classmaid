import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getSchoolContent,
  getSchools,
  getSiteContent,
  resolveBookmarks,
} from '../getContent';
import { getPrivateContent, PrivateContent } from '../privateContent';

vi.mock('../privateContent', () => ({ getPrivateContent: vi.fn() }));

const UNAVAILABLE: PrivateContent = {
  guides: [],
  links: {},
  meta: {},
  status: 'unavailable',
};

const allIds = (sections: Content.Section[]) =>
  sections.flatMap((s) => s.items.map((i) => i.id));

describe('getContent', () => {
  beforeEach(() => {
    vi.mocked(getPrivateContent).mockImplementation(
      async (slug): Promise<PrivateContent> => ({
        guides: slug
          ? [{ title: 'G', icon: '', guides: [], categories: [] }]
          : [],
        links: {
          feedback: { url: 'https://forms.example/feedback' },
          library: { url: 'https://sheet.example/library' },
          ...(slug === 'smu'
            ? { smusa_feedback: { url: 'https://forms.example/smusa' } }
            : {}),
        },
        meta: slug
          ? { guides_note: 'Note', site_title: 'From sheet' }
          : { site_title: 'From sheet' },
        status: 'ok',
      })
    );
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

  it('merges site JSON with the sheet global links and meta', async () => {
    const site = await getSiteContent();
    expect(getPrivateContent).toHaveBeenCalledWith();
    expect(site.links.github).toBeDefined();
    expect(site.links.feedback.url).toBe('https://forms.example/feedback');
    expect(site.links.suggestion_form).toBeUndefined();
    expect(site.meta.site_title).toBe('From sheet');
    expect(site.sheetStatus).toBe('ok');
  });

  it('returns null for an unknown school', async () => {
    expect(await getSchoolContent('nope')).toBeNull();
    expect(getPrivateContent).not.toHaveBeenCalled();
  });

  it('merges links with the sheet winning, and meta with the sheet last', async () => {
    const content = await getSchoolContent('smu');
    expect(content?.links.github).toBeDefined();
    expect(content?.links.library.url).toBe('https://sheet.example/library');
    expect(content?.links.feedback).toBeDefined();
    expect(content?.meta.lks_image_author).toBeDefined();
    expect(content?.meta.guides_note).toBe('Note');
    expect(content?.meta.site_title).toBe('From sheet');
    expect(content?.sheetStatus).toBe('ok');
    expect(content?.guides).toHaveLength(1);
  });

  it('resolves linkKey bookmarks from the sheet links', async () => {
    const content = await getSchoolContent('smu');
    const feedback = content?.bookmarks
      .flatMap((s) => s.items)
      .find((i) => i.id === 'smusa_feedback');
    expect(feedback?.link).toBe('https://forms.example/smusa');
    expect(content?.omittedBookmarks).toEqual([]);
  });

  it('omits unresolved linkKey bookmarks when the sheet is unavailable', async () => {
    vi.mocked(getPrivateContent).mockResolvedValue(UNAVAILABLE);
    const content = await getSchoolContent('smu');
    expect(content?.sheetStatus).toBe('unavailable');
    expect(content?.guides).toEqual([]);
    expect(content?.omittedBookmarks).toEqual(['smusa_feedback']);
    const ids = allIds(content?.bookmarks ?? []);
    expect(ids).not.toContain('smusa_feedback');
    expect(ids).toContain('incident_report');
    expect(ids.length).toBeGreaterThan(20);
  });
});

describe('resolveBookmarks', () => {
  const sections: Content.Section[] = [
    {
      id: 'a',
      title: 'A',
      showOnHome: true,
      items: [
        {
          id: 'public',
          title: 'Public',
          icon: 'globe',
          color: '#000000',
          type: 'url',
          link: 'https://public',
        },
        {
          id: 'private',
          title: 'Private',
          icon: 'mail',
          color: '#000000',
          type: 'url',
          linkKey: 'private_form',
        },
      ],
    },
    {
      id: 'b',
      title: 'B',
      showOnHome: false,
      items: [
        {
          id: 'only_private',
          title: 'Only private',
          icon: 'mail',
          color: '#000000',
          type: 'url',
          linkKey: 'missing',
        },
      ],
    },
  ];

  it('fills links, drops unresolved items and empty sections', () => {
    const { bookmarks, omitted } = resolveBookmarks(sections, {
      private_form: { url: 'https://private' },
    });
    expect(omitted).toEqual(['only_private']);
    expect(bookmarks.map((s) => s.id)).toEqual(['a']);
    expect(bookmarks[0].items[1].link).toBe('https://private');
    expect(sections[0].items[1].link).toBeUndefined();
  });
});
