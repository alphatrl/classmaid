/**
 * Hand-written validators for data/schools/<slug>.json and data/site.json.
 * They collect every problem and throw once, so a bad edit fails the build
 * (and the data test) with a readable list.
 */

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const ICON_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KEY_RE = /^[a-z0-9_]+$/;
const DOMAIN_RE = /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/i;
const BOOKMARK_TYPES: Content.BookmarkType[] = ['url', 'internal', 'guides'];

const SCHOOL_KEYS = [
  '$schema',
  'slug',
  'name',
  'shortName',
  'enabled',
  'sso',
  'lms',
  'calendar',
  'colors',
  'features',
  'bookmarks',
  'links',
  'meta',
];
const SITE_KEYS = ['$schema', 'links', 'meta'];

export class ContentValidationError extends Error {
  constructor(
    source: string,
    readonly problems: string[]
  ) {
    super(`Invalid ${source}:\n  - ${problems.join('\n  - ')}`);
    this.name = 'ContentValidationError';
  }
}

type Obj = Record<string, unknown>;

class Checker {
  readonly problems: string[] = [];

  fail(path: string, message: string): void {
    this.problems.push(`${path}: ${message}`);
  }

  object(value: unknown, path: string): Obj | undefined {
    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      return value as Obj;
    }
    this.fail(path, 'must be an object');
    return undefined;
  }

  array(value: unknown, path: string): unknown[] {
    if (Array.isArray(value)) return value;
    this.fail(path, 'must be an array');
    return [];
  }

  string(value: unknown, path: string, pattern?: RegExp, hint?: string) {
    if (typeof value !== 'string' || value.trim() === '') {
      this.fail(path, 'must be a non-empty string');
    } else if (pattern && !pattern.test(value)) {
      this.fail(path, hint ?? `must match ${pattern}`);
    }
  }

  optionalString(value: unknown, path: string) {
    if (value !== undefined && typeof value !== 'string') {
      this.fail(path, 'must be a string when present');
    }
  }

  boolean(value: unknown, path: string) {
    if (typeof value !== 'boolean') this.fail(path, 'must be true or false');
  }

  url(value: unknown, path: string) {
    this.string(value, path, /^https?:\/\/\S+$/, 'must be an http(s) URL');
  }

  onlyKeys(obj: Obj, allowed: string[], path: string) {
    Object.keys(obj)
      .filter((key) => !allowed.includes(key))
      .forEach((key) => this.fail(`${path}.${key}`, 'is not a known field'));
  }

  links(value: unknown, path: string) {
    const links = this.object(value, path);
    if (!links) return;
    Object.entries(links).forEach(([key, raw]) => {
      const link = this.object(raw, `${path}.${key}`);
      if (!link) return;
      this.onlyKeys(link, ['url', 'label'], `${path}.${key}`);
      this.url(link.url, `${path}.${key}.url`);
      this.optionalString(link.label, `${path}.${key}.label`);
    });
  }

  meta(value: unknown, path: string) {
    const meta = this.object(value, path);
    if (!meta) return;
    Object.entries(meta).forEach(([key, raw]) => {
      if (typeof raw !== 'string')
        this.fail(`${path}.${key}`, 'must be a string');
    });
  }
}

function checkBookmarks(c: Checker, value: unknown) {
  const ids = new Set<string>();
  c.array(value, 'bookmarks').forEach((rawSection, i) => {
    const sp = `bookmarks[${i}]`;
    const section = c.object(rawSection, sp);
    if (!section) return;
    c.onlyKeys(section, ['id', 'title', 'showOnHome', 'items'], sp);
    c.string(section.id, `${sp}.id`);
    c.string(section.title, `${sp}.title`);
    c.boolean(section.showOnHome, `${sp}.showOnHome`);
    c.array(section.items, `${sp}.items`).forEach((rawItem, j) => {
      const ip = `${sp}.items[${j}]`;
      const item = c.object(rawItem, ip);
      if (!item) return;
      c.onlyKeys(
        item,
        [
          'id',
          'title',
          'icon',
          'color',
          'type',
          'link',
          'linkKey',
          'description',
        ],
        ip
      );
      c.string(item.id, `${ip}.id`);
      if (typeof item.id === 'string') {
        if (ids.has(item.id)) c.fail(`${ip}.id`, `duplicate id "${item.id}"`);
        ids.add(item.id);
      }
      c.string(item.title, `${ip}.title`);
      c.string(
        item.icon,
        `${ip}.icon`,
        ICON_RE,
        'must be a kebab-case icon name'
      );
      c.string(item.color, `${ip}.color`, HEX_RE, 'must be a #rrggbb colour');
      c.optionalString(item.description, `${ip}.description`);
      const type = item.type as Content.BookmarkType;
      if (!BOOKMARK_TYPES.includes(type)) {
        c.fail(`${ip}.type`, `must be one of ${BOOKMARK_TYPES.join(', ')}`);
      } else if (type === 'url') {
        // Exactly one of a public URL or a key into the private sheet links
        if ((item.link === undefined) === (item.linkKey === undefined)) {
          c.fail(ip, 'url bookmarks need exactly one of link or linkKey');
        } else if (item.link !== undefined) {
          c.url(item.link, `${ip}.link`);
        } else {
          c.string(item.linkKey, `${ip}.linkKey`, KEY_RE, 'must be a link key');
        }
      } else {
        if (type === 'internal') c.string(item.link, `${ip}.link`);
        else if (item.link !== undefined) {
          c.fail(`${ip}.link`, 'must be absent for guides');
        }
        if (item.linkKey !== undefined) {
          c.fail(`${ip}.linkKey`, 'is only allowed on url bookmarks');
        }
      }
    });
  });
}

function stripSchema<T>(obj: Obj): T {
  const { $schema: _schema, ...rest } = obj;
  void _schema;
  return rest as T;
}

/** Validates a school config; `expectedSlug` is the filename without `.json`. */
export function validateSchoolConfig(
  value: unknown,
  expectedSlug?: string
): Content.SchoolConfig {
  const source = `data/schools/${expectedSlug ?? '?'}.json`;
  const c = new Checker();
  const obj = c.object(value, '(root)');
  if (!obj) throw new ContentValidationError(source, c.problems);

  c.onlyKeys(obj, SCHOOL_KEYS, '(root)');
  c.string(obj.slug, 'slug', SLUG_RE, 'must be a lowercase slug');
  if (expectedSlug !== undefined && obj.slug !== expectedSlug) {
    c.fail('slug', `must equal the filename "${expectedSlug}"`);
  }
  c.string(obj.name, 'name');
  c.string(obj.shortName, 'shortName');
  c.boolean(obj.enabled, 'enabled');

  const sso = c.object(obj.sso, 'sso');
  if (sso) {
    c.onlyKeys(sso, ['domain'], 'sso');
    c.string(sso.domain, 'sso.domain', DOMAIN_RE, 'must be a domain name');
  }
  const lms = c.object(obj.lms, 'lms');
  if (lms) {
    c.onlyKeys(lms, ['name', 'url'], 'lms');
    c.string(lms.name, 'lms.name');
    c.url(lms.url, 'lms.url');
  }
  const calendar = c.object(obj.calendar, 'calendar');
  if (calendar) {
    c.onlyKeys(calendar, ['semestersKey', 'importantDatesKey'], 'calendar');
    c.string(calendar.semestersKey, 'calendar.semestersKey');
    c.string(calendar.importantDatesKey, 'calendar.importantDatesKey');
  }
  const colors = c.object(obj.colors, 'colors');
  if (colors) {
    c.onlyKeys(colors, ['accent'], 'colors');
    c.string(
      colors.accent,
      'colors.accent',
      HEX_RE,
      'must be a #rrggbb colour'
    );
  }
  c.array(obj.features, 'features').forEach((f, i) =>
    c.string(f, `features[${i}]`)
  );
  checkBookmarks(c, obj.bookmarks);
  c.links(obj.links, 'links');
  c.meta(obj.meta, 'meta');

  if (c.problems.length > 0) {
    throw new ContentValidationError(source, c.problems);
  }
  return stripSchema<Content.SchoolConfig>(obj);
}

/** Validates data/site.json. */
export function validateSiteConfig(value: unknown): Content.SiteConfig {
  const c = new Checker();
  const obj = c.object(value, '(root)');
  if (obj) {
    c.onlyKeys(obj, SITE_KEYS, '(root)');
    c.links(obj.links, 'links');
    c.meta(obj.meta, 'meta');
  }
  if (!obj || c.problems.length > 0) {
    throw new ContentValidationError('data/site.json', c.problems);
  }
  return stripSchema<Content.SiteConfig>(obj);
}
