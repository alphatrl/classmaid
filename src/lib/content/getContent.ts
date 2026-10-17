/** Composes the API payloads from the bundled JSON config and the private sheet. */
import { getPrivateContent } from './privateContent';
import {
  getSchoolConfig,
  getSiteConfig,
  listSchools,
  toSchool,
} from './schools';

export function getSchools(): Content.School[] {
  return listSchools();
}

/** data/site.json merged with the sheet's global links and meta (sheet wins). */
export async function getSiteContent(): Promise<Content.SitePayload> {
  const site = getSiteConfig();
  const sheet = await getPrivateContent();
  return {
    links: { ...site.links, ...sheet.links },
    meta: { ...site.meta, ...sheet.meta },
    sheetStatus: sheet.status,
  };
}

/**
 * Fills `link` for bookmarks that reference a private link by `linkKey`.
 * Bookmarks whose key does not resolve are dropped (and reported) so the UI
 * never renders a dead tile; sections left empty are dropped too.
 */
export function resolveBookmarks(
  sections: Content.Section[],
  links: Content.Links
): { bookmarks: Content.Section[]; omitted: string[] } {
  const omitted: string[] = [];
  const bookmarks = sections
    .map((section) => ({
      ...section,
      items: section.items.flatMap((item) => {
        if (item.linkKey == null) return [item];
        const link = links[item.linkKey];
        if (link == null) {
          omitted.push(item.id);
          return [];
        }
        return [{ ...item, link: link.url }];
      }),
    }))
    .filter((section) => section.items.length > 0);
  return { bookmarks, omitted };
}

export async function getSchoolContent(
  slug: string
): Promise<Content.SchoolPayload | null> {
  const config = getSchoolConfig(slug);
  if (!config) return null;
  const site = getSiteConfig();
  const sheet = await getPrivateContent(slug);
  const links = { ...site.links, ...config.links, ...sheet.links };
  const { bookmarks, omitted } = resolveBookmarks(config.bookmarks, links);
  return {
    school: toSchool(config),
    bookmarks,
    guides: sheet.guides,
    sheetStatus: sheet.status,
    links,
    meta: { ...site.meta, ...config.meta, ...sheet.meta },
    omittedBookmarks: omitted,
  };
}
