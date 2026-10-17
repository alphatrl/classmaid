/**
 * Private guides from the Google Sheet (SHEET_ID_GUIDES). There is deliberately
 * no bundled fallback: these links must not live in the codebase. Resolution
 * order is fresh cache > live fetch > last-good cache > unavailable.
 */
import { mergeScoped, parseGuidesSheet } from './parse';
import { getSheetsClient } from './sheets';
import { GuidesData } from './types';

export const CACHE_TTL_MS = 5 * 60 * 1000;

/** After a failed refresh, keep serving last-good data this long before retrying. */
export const RETRY_AFTER_FAILURE_MS = 30 * 1000;

export interface SchoolGuides {
  guides: Content.GuideGroup[];
  /** Guides sheet `meta` tab: global rows merged with the school's */
  meta: Content.Meta;
  status: Content.GuidesStatus;
}

let cache: { data: GuidesData; fetchedAt: number } | undefined;
let inFlight: Promise<GuidesData | null> | undefined;
const warned = new Set<string>();

function warnOnce(id: string, message: string) {
  if (warned.has(id)) return;
  warned.add(id);
  console.warn(message);
}

async function refresh(): Promise<GuidesData | null> {
  const stale = cache;
  try {
    const spreadsheetId = process.env.SHEET_ID_GUIDES;
    const client = await getSheetsClient();
    if (!client || !spreadsheetId) {
      warnOnce(
        'not-configured',
        '[content] Guides sheet not configured (GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SHEET_ID_GUIDES); guides unavailable'
      );
      return stale?.data ?? null;
    }
    const data = parseGuidesSheet(await client.fetchSpreadsheet(spreadsheetId));
    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    warnOnce(
      `error:${message}`,
      `[content] Failed to load guides from Google Sheets; ${
        stale ? 'serving last-good data' : 'guides unavailable'
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

function loadGuides(): Promise<GuidesData | null> {
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

export async function getSchoolGuides(slug: string): Promise<SchoolGuides> {
  const data = await loadGuides();
  if (!data) return { guides: [], meta: {}, status: 'unavailable' };
  return {
    guides: data.bySchool[slug] ?? [],
    meta: mergeScoped(data.meta, slug),
    status: 'ok',
  };
}

/** Clears the cache so the next read refetches. */
export function invalidateGuides(): void {
  cache = undefined;
}

/** Clears the cache and reloads the sheet now. */
export async function refreshGuides(): Promise<Content.GuidesStatus> {
  invalidateGuides();
  return (await loadGuides()) ? 'ok' : 'unavailable';
}

export function __resetGuidesForTests(): void {
  cache = undefined;
  inFlight = undefined;
  warned.clear();
}
