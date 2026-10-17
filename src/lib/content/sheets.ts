import { JWT } from 'google-auth-library';

import { SheetValues } from './types';

export interface SheetsClient {
  /** Reads every tab (except `_`-prefixed ones) of a spreadsheet. */
  // eslint-disable-next-line no-unused-vars -- base rule misreads type-signature params
  fetchSpreadsheet(spreadsheetId: string): Promise<SheetValues>;
}

const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TIMEOUT_MS = 10000;

interface SpreadsheetMeta {
  sheets?: { properties?: { title?: string } }[];
}

interface BatchGetResponse {
  valueRanges?: { values?: unknown[][] }[];
}

/** Accepts raw PEM, PEM with literal `\n`, or base64 of the PEM. */
export function decodePrivateKey(raw: string): string {
  const value = raw.trim();
  const pem = value.startsWith('-----BEGIN')
    ? value
    : Buffer.from(value, 'base64').toString('utf8');
  return pem.replace(/\\n/g, '\n');
}

export function createSheetsClient(
  email: string,
  rawKey: string
): SheetsClient {
  const jwt = new JWT({ email, key: decodePrivateKey(rawKey), scopes: SCOPES });

  async function get<T>(url: string): Promise<T> {
    const { token } = await jwt.getAccessToken();
    if (!token) throw new Error('Google auth returned no access token');
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(
        `Google Sheets API request failed with status ${res.status}`
      );
    }
    return (await res.json()) as T;
  }

  return {
    async fetchSpreadsheet(spreadsheetId) {
      const base = `${SHEETS_API}/${encodeURIComponent(spreadsheetId)}`;
      // List tabs first so new school tabs are discovered, not configured
      const meta = await get<SpreadsheetMeta>(
        `${base}?fields=sheets.properties.title`
      );
      const tabs = (meta.sheets ?? [])
        .map((s) => s.properties?.title)
        .filter((t): t is string => !!t && !t.startsWith('_'));
      if (tabs.length === 0) return {};

      const ranges = tabs
        .map(
          (t) => `ranges=${encodeURIComponent(`'${t.replace(/'/g, "''")}'`)}`
        )
        .join('&');
      const data = await get<BatchGetResponse>(
        `${base}/values:batchGet?${ranges}&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE`
      );

      const result: SheetValues = {};
      tabs.forEach((tab, i) => {
        const values = data.valueRanges?.[i]?.values ?? [];
        result[tab] = values.map((row) =>
          row.map((cell) => String(cell ?? ''))
        );
      });
      return result;
    },
  };
}

let memo: { email: string; key: string; client: SheetsClient } | undefined;

export async function getSheetsClient(): Promise<SheetsClient | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) return null;
  if (!memo || memo.email !== email || memo.key !== key) {
    memo = { email, key, client: createSheetsClient(email, key) };
  }
  return memo.client;
}
