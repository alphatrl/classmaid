/** Internal types for the guides sheet (not part of the API payloads). */

/** One tab's values as returned by the Sheets API: first row is the header. */
export type SheetRows = string[][];

/** Tab name -> rows, for one spreadsheet. */
export type SheetValues = Record<string, SheetRows>;

/** Values split into global (blank `school`) and per-school entries. */
export interface Scoped<T> {
  global: T;
  bySchool: Record<string, T>;
}

/** Parsed guides spreadsheet. */
export interface GuidesData {
  /** Guide groups per school tab */
  bySchool: Record<string, Content.GuideGroup[]>;
  /** The optional `meta` tab */
  meta: Scoped<Content.Meta>;
}
