/** Internal types for the private sheet (not part of the API payloads). */

/** One tab's values as returned by the Sheets API: first row is the header. */
export type SheetRows = string[][];

/** Tab name -> rows, for one spreadsheet. */
export type SheetValues = Record<string, SheetRows>;

/** Values split into global (blank `school`) and per-school entries. */
export interface Scoped<T> {
  global: T;
  bySchool: Record<string, T>;
}

/** Parsed private spreadsheet (SHEET_ID_GUIDES). */
export interface PrivateSheetData {
  /** Guide groups per school tab */
  guides: Record<string, Content.GuideGroup[]>;
  /** The optional `meta` tab */
  meta: Scoped<Content.Meta>;
  /** The optional `links` tab (feedback and contact forms, etc.) */
  links: Scoped<Content.Links>;
}
