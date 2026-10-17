import { describe, expect, it } from 'vitest';

import smu from '../../../../data/schools/smu.json';
import site from '../../../../data/site.json';
import {
  ContentValidationError,
  validateSchoolConfig,
  validateSiteConfig,
} from '../validate';

type Json = Record<string, unknown>;

const clone = (): Json => JSON.parse(JSON.stringify(smu));

function problemsOf(fn: () => unknown): string[] {
  try {
    fn();
  } catch (error) {
    if (error instanceof ContentValidationError) return error.problems;
    throw error;
  }
  return [];
}

describe('validateSchoolConfig', () => {
  it('accepts smu.json and strips $schema', () => {
    const config = validateSchoolConfig(smu, 'smu');
    expect(config.slug).toBe('smu');
    expect('$schema' in config).toBe(false);
  });

  it('requires the slug to equal the filename', () => {
    expect(problemsOf(() => validateSchoolConfig(smu, 'nus'))).toEqual([
      'slug: must equal the filename "nus"',
    ]);
  });

  it('reports every problem at once', () => {
    const bad = clone();
    bad.slug = 'Not A Slug';
    bad.enabled = 'yes';
    (bad.colors as Json).accent = 'blue';
    (bad.sso as Json).domain = 'not a domain';
    bad.extra = true;
    const problems = problemsOf(() => validateSchoolConfig(bad));
    expect(problems).toEqual(
      expect.arrayContaining([
        'slug: must be a lowercase slug',
        'enabled: must be true or false',
        'colors.accent: must be a #rrggbb colour',
        'sso.domain: must be a domain name',
        '(root).extra: is not a known field',
      ])
    );
  });

  it('checks bookmark types, links, icons and duplicate ids', () => {
    const bad = clone();
    const [first] = bad.bookmarks as { items: Json[] }[];
    first.items[0].type = 'taskade';
    first.items[1].link = 'not-a-url';
    first.items[2].icon = 'Menu_Book';
    first.items[3].id = first.items[4].id;
    first.items.push({
      id: 'guides_with_link',
      title: 'Guides',
      icon: 'bookmark',
      color: '#000000',
      type: 'guides',
      link: 'https://example.com',
    });
    const problems = problemsOf(() => validateSchoolConfig(bad));
    expect(problems).toEqual(
      expect.arrayContaining([
        'bookmarks[0].items[0].type: must be one of url, internal, guides',
        'bookmarks[0].items[1].link: must be an http(s) URL',
        'bookmarks[0].items[2].icon: must be a kebab-case icon name',
        `bookmarks[0].items[4].id: duplicate id "${first.items[4].id}"`,
        'bookmarks[0].items[6].link: must be absent for guides',
      ])
    );
  });

  it('checks links and meta values', () => {
    const bad = clone();
    bad.links = { library: { url: 'ftp://x' }, other: 'https://x' };
    bad.meta = { note: 1 };
    expect(problemsOf(() => validateSchoolConfig(bad))).toEqual([
      'links.library.url: must be an http(s) URL',
      'links.other: must be an object',
      'meta.note: must be a string',
    ]);
  });
});

describe('validateSiteConfig', () => {
  it('accepts site.json', () => {
    expect(validateSiteConfig(site).links.github.url).toMatch(/^https:/);
  });

  it('rejects unknown fields and bad links', () => {
    expect(
      problemsOf(() =>
        validateSiteConfig({ links: { a: { url: 'x' } }, meta: {}, x: 1 })
      )
    ).toEqual([
      '(root).x: is not a known field',
      'links.a.url: must be an http(s) URL',
    ]);
  });
});
