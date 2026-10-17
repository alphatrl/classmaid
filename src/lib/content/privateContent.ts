/**
 * Private content from the Google Sheet (SHEET_ID_GUIDES): school guides plus
 * the `links` (feedback, contact forms) and `meta` tabs, read in one fetch.
 * There is deliberately no bundled fallback: these links must not live in the
 * codebase. Resolution order is fresh cache > live fetch > last-good cache >
 * unavailable.
 */
import { mergeScoped, parsePrivateSheet } from './parse';
import { getSheetsClient } from './sheets';
import { PrivateSheetData } from './types';

export const CACHE_TTL_MS = 5 * 60 * 1000;

/** After a failed refresh, keep serving last-good data this long before retrying. */
export const RETRY_AFTER_FAILURE_MS = 30 * 1000;

export interface PrivateContent {
  /** The school's guides; empty when no school is given */
  guides: Content.GuideGroup[];
  /** `links` tab: global rows merged with the school's */
  links: Content.Links;
  /** `meta` tab: global rows merged with the school's */
  meta: Content.Meta;
  status: Content.SheetStatus;
}

let cache: { data: PrivateSheetData; fetchedAt: number } | undefined;
let inFlight: Promise<PrivateSheetData | null> | undefined;
const warned = new Set<string>();

function warnOnce(id: string, message: string) {
  if (warned.has(id)) return;
  warned.add(id);
  console.warn(message);
}

async function refresh(): Promise<PrivateSheetData | null> {
  const stale = cache;
  try {
    const spreadsheetId = process.env.SHEET_ID_GUIDES;
    const client = await getSheetsClient();
    if (!client || !spreadsheetId) {
      warnOnce(
        'not-configured',
        '[content] Private sheet not configured (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SHEET_ID_GUIDES); guides and private links unavailable'
      );
      return stale?.data ?? null;
    }
    const data = parsePrivateSheet(
      await client.fetchSpreadsheet(spreadsheetId)
    );
    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    warnOnce(
      `error:${message}`,
      `[content] Failed to load the private sheet; ${
        stale
          ? 'serving last-good data'
          : 'guides and private links unavailable'
      }: ${message}`
    );
    if (stale) {
      // Back off so an outage does not send every request to Google
      cache = {
        data: stale.data,
        fetchedAt: Date.now() - CACHE_TTL_MS + RETRY_AFTER_FAILURE_MS,
      };
      return stale.data;
    }
    return null;
  }
}

function loadSheet(): Promise<PrivateSheetData | null> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return Promise.resolve(cache.data);
  }
  if (inFlight) return inFlight;
  const promise = refresh().finally(() => {
    if (inFlight === promise) inFlight = undefined;
  });
  inFlight = promise;
  return promise;
}

/** Private content for a school, or only the global rows when `slug` is omitted. */
export async function getPrivateContent(
  slug?: string
): Promise<PrivateContent> {
  const data = await loadSheet();
  if (!data) return { guides: [], links: {}, meta: {}, status: 'unavailable' };
  if (slug == null) {
    return {
      guides: [],
      links: data.links.global,
      meta: data.meta.global,
      status: 'ok',
    };
  }
  return {
    guides: data.guides[slug] ?? [],
    links: mergeScoped(data.links, slug),
    meta: mergeScoped(data.meta, slug),
    status: 'ok',
  };
}

/** Clears the cache so the next read refetches. */
export function invalidatePrivateContent(): void {
  cache = undefined;
}

/** Clears the cache and reloads the sheet now. */
export async function refreshPrivateContent(): Promise<Content.SheetStatus> {
  invalidatePrivateContent();
  return (await loadSheet()) ? 'ok' : 'unavailable';
}

export function __resetPrivateContentForTests(): void {
  cache = undefined;
  inFlight = undefined;
  warned.clear();
}
