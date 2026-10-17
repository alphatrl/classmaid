/**
 * Public content bundled from data/*.json. Imports are static so the JSON is
 * part of the build (no fs at runtime); invalid files throw at load time.
 * To add a school, add data/schools/<slug>.json and register it below.
 */
import smuJson from '../../../data/schools/smu.json';
import siteJson from '../../../data/site.json';
import { validateSchoolConfig, validateSiteConfig } from './validate';

/** Raw school JSON keyed by filename slug */
export const SCHOOL_FILES: Record<string, unknown> = {
  smu: smuJson,
};

const SCHOOLS: Content.SchoolConfig[] = Object.entries(SCHOOL_FILES).map(
  ([slug, json]) => validateSchoolConfig(json, slug)
);

const SITE: Content.SiteConfig = validateSiteConfig(siteJson);

/** Public profile of a school (config without bookmarks, links and meta). */
export function toSchool(config: Content.SchoolConfig): Content.School {
  const { slug, name, shortName, enabled, sso, lms, calendar, colors } = config;
  return {
    slug,
    name,
    shortName,
    enabled,
    sso,
    lms,
    calendar,
    colors,
    features: config.features,
  };
}

/** Enabled schools, in registration order. */
export function listSchools(): Content.School[] {
  return SCHOOLS.filter((s) => s.enabled).map(toSchool);
}

/** Config of an enabled school, or null. */
export function getSchoolConfig(slug: string): Content.SchoolConfig | null {
  return SCHOOLS.find((s) => s.slug === slug && s.enabled) ?? null;
}

export function getSiteConfig(): Content.SiteConfig {
  return SITE;
}
