import { describe, expect, it } from 'vitest';

import {
  countGuides,
  getGuidesStatus,
  isSafeLink,
  toGuideGroups,
} from '../guides';

// Mock rows only; real guides live in the private sheet
const GROUPS: Content.GuideGroup[] = [
  {
    title: 'Group A ',
    icon: 'book-open',
    guides: [
      { title: 'Top guide', link: 'https://example.com/top', description: '' },
    ],
    categories: [
      {
        title: 'Category 1',
        icon: '',
        guides: [
          {
            title: 'Guide 1',
            link: 'https://example.com/1',
            description: ' First ',
          },
          { title: 'Unsafe', link: 'javascript:alert(1)' },
        ],
      },
      {
        title: 'Empty category',
        icon: 'folder',
        guides: [{ title: '', link: 'https://example.com/untitled' }],
      },
    ],
  },
  {
    title: 'Empty group',
    icon: ' ',
    guides: [{ title: 'Bad link', link: 'not a url' }],
    categories: [],
  },
];

describe('toGuideGroups', () => {
  it('builds group -> category -> guide and drops empty or unsafe entries', () => {
    const groups = toGuideGroups(GROUPS);
    expect(groups).toEqual([
      {
        key: 'g0',
        title: 'Group A',
        icon: 'book-open',
        guides: [
          {
            key: 'g0/0',
            title: 'Top guide',
            link: 'https://example.com/top',
            description: null,
          },
        ],
        categories: [
          {
            key: 'g0/c0',
            title: 'Category 1',
            icon: null,
            guides: [
              {
                key: 'g0/c0/0',
                title: 'Guide 1',
                link: 'https://example.com/1',
                description: 'First',
              },
            ],
          },
        ],
      },
    ]);
    expect(countGuides(groups)).toBe(2);
  });

  it('returns no groups for no guides', () => {
    expect(toGuideGroups([])).toEqual([]);
    expect(countGuides([])).toBe(0);
  });
});

describe('getGuidesStatus', () => {
  const groups = toGuideGroups(GROUPS);

  it('is ready only with a readable sheet and at least one guide', () => {
    expect(getGuidesStatus('ok', groups)).toBe('ready');
    expect(getGuidesStatus('ok', [])).toBe('unavailable');
    expect(getGuidesStatus('unavailable', groups)).toBe('unavailable');
    expect(getGuidesStatus(null, groups)).toBe('unavailable');
  });
});

describe('isSafeLink', () => {
  it('accepts http(s) links only', () => {
    expect(isSafeLink('https://example.com')).toBe(true);
    expect(isSafeLink('http://example.com')).toBe(true);
    expect(isSafeLink('javascript:alert(1)')).toBe(false);
    expect(isSafeLink('/relative')).toBe(false);
  });
});
