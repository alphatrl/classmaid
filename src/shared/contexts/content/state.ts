/**
 * Pure state helpers for ContentContext. No React and no `@/` imports so
 * vitest can load them without the Next.js alias config.
 */

/** Payload held by the context: a school payload, or the site payload on pages without a school. */
export type ContentPayload = Content.SchoolPayload | Content.SitePayload;

/** Which request a result belongs to; `null` slug means the site payload. */
export interface ContentState {
  /** Request key of the last settled request (see `contentKey`), or null before the first one */
  key: string | null;
  payload: ContentPayload | null;
  error: string | null;
}

export type ContentAction =
  | { type: 'success'; key: string; payload: ContentPayload }
  | { type: 'failure'; key: string; error: string };

export const INITIAL_CONTENT_STATE: ContentState = {
  key: null,
  payload: null,
  error: null,
};

export function contentReducer(
  state: ContentState,
  action: ContentAction
): ContentState {
  switch (action.type) {
    case 'success':
      return { key: action.key, payload: action.payload, error: null };
    case 'failure':
      return { key: action.key, payload: null, error: action.error };
    default:
      return state;
  }
}

/** Lowercase first path segment of a route ("/smu/calendar" -> "smu"), or null. */
export function getSchoolSlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/([^/?#[\]]+)/);
  return match ? match[1].toLowerCase() : null;
}

/** Root route of the current section ("/smu/calendar" -> "/smu"). */
export function getSectionRootPath(pathname: string): string {
  const slug = pathname.match(/^\/[^/?#]+/);
  return slug?.[0] ?? '/';
}

/** Cache key and API path for a slug. */
export function contentKey(slug: string | null): string {
  return slug == null
    ? '/api/content/site'
    : `/api/content/${encodeURIComponent(slug)}/all`;
}

export function isSchoolPayload(
  payload: ContentPayload | null
): payload is Content.SchoolPayload {
  return payload != null && 'school' in payload;
}

/**
 * Whether a feature is on. Features are unknown (null) while loading or after
 * an error; then every feature counts as on so the static SMU page keeps its
 * widgets, and each widget handles its own data failures.
 */
export function isFeatureEnabled(
  features: string[] | null,
  feature: string
): boolean {
  return features == null || features.includes(feature);
}

/** Internal bookmark routes gated by a school feature flag. */
const INTERNAL_FEATURES: Record<string, string> = {
  'boss-export': 'boss_export',
};

/** Drops bookmarks whose feature is off, then sections left empty. */
export function filterBookmarksByFeatures(
  sections: Content.Section[],
  features: string[] | null
): Content.Section[] {
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (item.type !== 'internal' || item.link == null) return true;
        const feature = INTERNAL_FEATURES[item.link];
        return feature == null || isFeatureEnabled(features, feature);
      }),
    }))
    .filter((section) => section.items.length > 0);
}

/** Bookmarks of the sections flagged `showOnHome`, in order. */
export function selectHomeBookmarks(
  sections: Content.Section[]
): Content.Bookmark[] {
  return sections
    .filter((section) => section.showOnHome)
    .flatMap((section) => section.items);
}

export interface ContentValue {
  /** Slug derived from the path; null on pages without a school */
  slug: string | null;
  school: Content.School | null;
  bookmarks: Content.Section[];
  guides: Content.GuideGroup[];
  links: Content.Links;
  meta: Content.Meta;
  /** null while loading or after an error */
  features: string[] | null;
  /** null until the payload arrives */
  sheetStatus: Content.SheetStatus | null;
  loading: boolean;
  error: string | null;
}

const EMPTY_LINKS: Content.Links = {};
const EMPTY_META: Content.Meta = {};

/** Derives the context value for `slug`; data of another slug counts as loading. */
export function selectContent(
  state: ContentState,
  slug: string | null
): ContentValue {
  const current = state.key === contentKey(slug);
  const payload = current ? state.payload : null;
  const school = isSchoolPayload(payload) ? payload : null;
  const features = school?.school.features ?? null;

  return {
    slug,
    school: school?.school ?? null,
    bookmarks: school
      ? filterBookmarksByFeatures(school.bookmarks, features)
      : [],
    guides: school?.guides ?? [],
    links: payload?.links ?? EMPTY_LINKS,
    meta: payload?.meta ?? EMPTY_META,
    features,
    sheetStatus: payload?.sheetStatus ?? null,
    loading: !current,
    error: current ? state.error : null,
  };
}
