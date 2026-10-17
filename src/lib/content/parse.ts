/**
 * Pure parsers turning the private spreadsheet into typed content.
 * No I/O: see sheets.ts for fetching and privateContent.ts for caching.
 */

import type { PrivateSheetData, Scoped, SheetRows, SheetValues } from './types';

const TRUE_VALUES = ['true', 'yes', '1', 'y'];
const FALSE_VALUES = ['false', 'no', '0', 'n'];

/** Coerces a cell to a boolean; blank or unrecognised values use `fallback`. */
export function toBool(value: string | undefined, fallback: boolean): boolean {
  const v = (value ?? '').trim().toLowerCase();
  if (TRUE_VALUES.includes(v)) return true;
  if (FALSE_VALUES.includes(v)) return false;
  return fallback;
}

/** Maps rows to records keyed by lowercased, trimmed header. Skips blank rows. */
export function rowsToRecords(rows: SheetRows): Record<string, string>[] {
  const [header, ...body] = rows;
  if (!header) return [];
  const keys = header.map((h) =>
    String(h ?? '')
      .trim()
      .toLowerCase()
  );
  const records: Record<string, string>[] = [];
  for (const row of body) {
    const record: Record<string, string> = {};
    let blank = true;
    keys.forEach((key, i) => {
      const cell = String(row[i] ?? '').trim();
      if (cell !== '') blank = false;
      if (key !== '') record[key] = cell;
    });
    if (!blank) records.push(record);
  }
  return records;
}

const slugOf = (value: string | undefined): string =>
  (value ?? '').trim().toLowerCase();

export function parseMeta(rows: SheetRows): Scoped<Content.Meta> {
  const result: Scoped<Content.Meta> = { global: {}, bySchool: {} };
  for (const r of rowsToRecords(rows)) {
    if (!r.key) continue;
    const school = slugOf(r.school);
    if (school) (result.bySchool[school] ??= {})[r.key] = r.value ?? '';
    else result.global[r.key] = r.value ?? '';
  }
  return result;
}

/** `school, key, url, label`; rows without key or url are skipped, later keys win. */
export function parseLinks(rows: SheetRows): Scoped<Content.Links> {
  const result: Scoped<Content.Links> = { global: {}, bySchool: {} };
  for (const r of rowsToRecords(rows)) {
    if (!r.key || !r.url) continue;
    const link: Content.Link = { url: r.url };
    if (r.label) link.label = r.label;
    const school = slugOf(r.school);
    if (school) (result.bySchool[school] ??= {})[r.key] = link;
    else result.global[r.key] = link;
  }
  return result;
}

export function parseGuides(rows: SheetRows): Content.GuideGroup[] {
  const groups = new Map<string, Content.GuideGroup>();
  const categories = new Map<string, Content.GuideCategory>();
  for (const r of rowsToRecords(rows)) {
    if (!r.group || !r.title || !r.link) continue;
    if (!toBool(r.enabled, true)) continue;
    let group = groups.get(r.group);
    if (!group) {
      group = {
        title: r.group,
        icon: r.group_icon ?? '',
        guides: [],
        categories: [],
      };
      groups.set(r.group, group);
    }
    const guide: Content.Guide = { title: r.title, link: r.link };
    if (r.description) guide.description = r.description;
    if (!r.category) {
      group.guides.push(guide);
      continue;
    }
    const catKey = `${r.group}\u0000${r.category}`;
    let category = categories.get(catKey);
    if (!category) {
      category = {
        title: r.category,
        icon: r.category_icon ?? '',
        guides: [],
      };
      categories.set(catKey, category);
      group.categories.push(category);
    }
    category.guides.push(guide);
  }
  return Array.from(groups.values());
}

/** Per-school entries override global ones. Unknown school => global only. */
export function mergeScoped<T extends object>(
  scoped: Scoped<T>,
  slug: string
): T {
  return { ...scoped.global, ...scoped.bySchool[slugOf(slug)] };
}

/** Reserved tab names; every other tab is a school slug. */
export const META_TAB = 'meta';
export const LINKS_TAB = 'links';

/**
 * Parses the private spreadsheet: `meta` (`school, key, value`) and `links`
 * (`school, key, url, label`) are reserved; every other tab is a school's
 * guides. `_`-prefixed tabs are ignored (the client already skips them).
 */
export function parsePrivateSheet(values: SheetValues): PrivateSheetData {
  const data: PrivateSheetData = {
    guides: {},
    meta: { global: {}, bySchool: {} },
    links: { global: {}, bySchool: {} },
  };
  for (const [tab, rows] of Object.entries(values)) {
    const slug = slugOf(tab);
    if (!slug || slug.startsWith('_')) continue;
    if (slug === META_TAB) data.meta = parseMeta(rows);
    else if (slug === LINKS_TAB) data.links = parseLinks(rows);
    else data.guides[slug] = parseGuides(rows);
  }
  return data;
}
