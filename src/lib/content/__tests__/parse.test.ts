import { describe, expect, it } from 'vitest';

import {
  mergeScoped,
  parseGuides,
  parseGuidesSheet,
  parseMeta,
  rowsToRecords,
  toBool,
} from '../parse';

describe('toBool', () => {
  it('coerces truthy values case-insensitively', () => {
    for (const v of ['TRUE', 'true', 'Yes', '1', 'Y', ' true ']) {
      expect(toBool(v, false)).toBe(true);
    }
  });
  it('coerces falsy values case-insensitively', () => {
    for (const v of ['FALSE', 'false', 'No', '0', 'N']) {
      expect(toBool(v, true)).toBe(false);
    }
  });
  it('uses fallback for blank, undefined and unknown', () => {
    expect(toBool('', true)).toBe(true);
    expect(toBool('  ', false)).toBe(false);
    expect(toBool(undefined, true)).toBe(true);
    expect(toBool('maybe', false)).toBe(false);
  });
});

describe('rowsToRecords', () => {
  it('lowercases and trims headers and trims cells', () => {
    expect(
      rowsToRecords([
        [' Slug ', 'NAME'],
        [' smu ', ' SMU '],
      ])
    ).toEqual([{ slug: 'smu', name: 'SMU' }]);
  });
  it('fills ragged rows and skips blank rows', () => {
    const rows = [['a', 'b', 'c'], ['1'], [], ['', ' ', ''], ['x', 'y', 'z']];
    expect(rowsToRecords(rows)).toEqual([
      { a: '1', b: '', c: '' },
      { a: 'x', b: 'y', c: 'z' },
    ]);
  });
  it('returns [] for empty input', () => {
    expect(rowsToRecords([])).toEqual([]);
  });
});

const guideHeader = [
  'group',
  'group_icon',
  'category',
  'category_icon',
  'title',
  'link',
  'description',
  'enabled',
];

describe('parseGuides', () => {
  it('groups by group then category, preserving order and first-row icons', () => {
    const rows = [
      guideHeader,
      ['G1', 'book', 'C1', 'star', 'T1', 'l1', 'd1', ''],
      ['G2', 'x', '', '', 'T2', 'l2', '', ''],
      ['G1', 'ignored', 'C2', 'moon', 'T3', 'l3', '', 'TRUE'],
      ['G1', '', 'C1', 'ignored', 'T4', 'l4', '', ''],
      ['G1', '', '', '', 'T5', 'l5', '', ''],
      ['G1', '', 'C1', '', 'Off', 'l6', '', 'FALSE'],
      ['G1', '', 'C1', '', 'NoLink', '', '', ''],
    ];
    const groups = parseGuides(rows);
    expect(groups.map((g) => g.title)).toEqual(['G1', 'G2']);
    expect(groups[0].icon).toBe('book');
    expect(groups[0].guides).toEqual([{ title: 'T5', link: 'l5' }]);
    expect(groups[0].categories.map((c) => [c.title, c.icon])).toEqual([
      ['C1', 'star'],
      ['C2', 'moon'],
    ]);
    expect(groups[0].categories[0].guides).toEqual([
      { title: 'T1', link: 'l1', description: 'd1' },
      { title: 'T4', link: 'l4' },
    ]);
    expect(groups[1]).toEqual({
      title: 'G2',
      icon: 'x',
      guides: [{ title: 'T2', link: 'l2' }],
      categories: [],
    });
  });
});

describe('parseMeta', () => {
  it('splits global vs school and lowercases school slug', () => {
    const meta = parseMeta([
      ['school', 'key', 'value'],
      ['', 'title', 'Global'],
      [' SMU ', 'title', 'School'],
      ['', '', 'skipped'],
    ]);
    expect(meta.global).toEqual({ title: 'Global' });
    expect(meta.bySchool).toEqual({ smu: { title: 'School' } });
  });
});

describe('mergeScoped', () => {
  const scoped = {
    global: { a: '1', b: '2' },
    bySchool: { smu: { b: 'x' } },
  };
  it('lets school override global', () => {
    expect(mergeScoped(scoped, 'smu')).toEqual({ a: '1', b: 'x' });
  });
  it('returns global only for unknown school', () => {
    expect(mergeScoped(scoped, 'nope')).toEqual({ a: '1', b: '2' });
  });
});

describe('parseGuidesSheet', () => {
  it('treats every tab as a school except meta', () => {
    const data = parseGuidesSheet({
      ' SMU ': [guideHeader, ['G', 'clock', '', '', 'T', 'https://t', '', '']],
      nus: [guideHeader],
      meta: [
        ['school', 'key', 'value'],
        ['smu', 'guides_note', 'Note'],
        ['', 'guides_title', 'Guides'],
      ],
    });
    expect(Object.keys(data.bySchool)).toEqual(['smu', 'nus']);
    expect(data.bySchool.smu[0].guides).toEqual([
      { title: 'T', link: 'https://t' },
    ]);
    expect(data.bySchool.nus).toEqual([]);
    expect(data.meta).toEqual({
      global: { guides_title: 'Guides' },
      bySchool: { smu: { guides_note: 'Note' } },
    });
  });

  it('returns empty data for an empty spreadsheet', () => {
    expect(parseGuidesSheet({})).toEqual({
      bySchool: {},
      meta: { global: {}, bySchool: {} },
    });
  });
});
