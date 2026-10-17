/**
 * Pure helpers that shape the sheet guides for the School Guides dialog.
 * No React and no `@/` imports so vitest can load them directly.
 */

export type GuidesStatus = 'ready' | 'unavailable';

export interface GuideItemView {
  key: string;
  title: string;
  link: string;
  description: string | null;
}

export interface GuideCategoryView {
  key: string;
  title: string;
  /** Lucide icon name, or null when the sheet has none */
  icon: string | null;
  guides: GuideItemView[];
}

export interface GuideGroupView {
  key: string;
  title: string;
  icon: string | null;
  /** Guides without a category, shown before the categories */
  guides: GuideItemView[];
  categories: GuideCategoryView[];
}

/** Ready only when the sheet was read and holds at least one guide. */
export function getGuidesStatus(
  sheetStatus: Content.SheetStatus | null,
  groups: GuideGroupView[]
): GuidesStatus {
  return sheetStatus === 'ok' && countGuides(groups) > 0
    ? 'ready'
    : 'unavailable';
}

/** Only http(s) links open from the dialog. */
export function isSafeLink(link: string): boolean {
  try {
    const { protocol } = new URL(link);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

function toIcon(icon: string): string | null {
  const trimmed = icon.trim();
  return trimmed === '' ? null : trimmed;
}

function toGuideItems(guides: Content.Guide[], prefix: string) {
  return guides
    .filter((guide) => guide.title.trim() !== '' && isSafeLink(guide.link))
    .map((guide, index): GuideItemView => ({
      key: `${prefix}/${index}`,
      title: guide.title.trim(),
      link: guide.link,
      description: guide.description?.trim() || null,
    }));
}

/**
 * group -> category -> guide view model, in sheet order. Drops guides without
 * a title or a safe link, then categories and groups left empty.
 */
export function toGuideGroups(groups: Content.GuideGroup[]): GuideGroupView[] {
  return groups
    .map((group, groupIndex): GuideGroupView => {
      const key = `g${groupIndex}`;
      return {
        key,
        title: group.title.trim(),
        icon: toIcon(group.icon),
        guides: toGuideItems(group.guides, key),
        categories: group.categories
          .map((category, categoryIndex): GuideCategoryView => ({
            key: `${key}/c${categoryIndex}`,
            title: category.title.trim(),
            icon: toIcon(category.icon),
            guides: toGuideItems(category.guides, `${key}/c${categoryIndex}`),
          }))
          .filter((category) => category.guides.length > 0),
      };
    })
    .filter((group) => group.guides.length + group.categories.length > 0);
}

export function countGuides(groups: GuideGroupView[]): number {
  return groups.reduce(
    (total, group) =>
      total +
      group.guides.length +
      group.categories.reduce((sum, c) => sum + c.guides.length, 0),
    0
  );
}
