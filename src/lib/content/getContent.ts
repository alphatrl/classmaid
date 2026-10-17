/** Composes the API payloads from the bundled JSON config and the guides sheet. */
import { getSchoolGuides } from './guides';
import {
  getSchoolConfig,
  getSiteConfig,
  listSchools,
  toSchool,
} from './schools';

export function getSchools(): Content.School[] {
  return listSchools();
}

export function getSiteContent(): Content.SitePayload {
  return getSiteConfig();
}

/** Global links merged with the school's; null for an unknown school. */
export function getSchoolLinks(slug: string): Content.Links | null {
  const config = getSchoolConfig(slug);
  return config ? { ...getSiteConfig().links, ...config.links } : null;
}

export async function getSchoolContent(
  slug: string
): Promise<Content.SchoolPayload | null> {
  const config = getSchoolConfig(slug);
  if (!config) return null;
  const site = getSiteConfig();
  const guides = await getSchoolGuides(slug);
  return {
    school: toSchool(config),
    bookmarks: config.bookmarks,
    guides: guides.guides,
    guidesStatus: guides.status,
    links: { ...site.links, ...config.links },
    meta: { ...site.meta, ...config.meta, ...guides.meta },
  };
}
