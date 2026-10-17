/** Keys of the static SMU route, used until the content payload resolves */
export const DEFAULT_CALENDAR_KEYS: Content.School['calendar'] = {
  semestersKey: 'SMU',
  importantDatesKey: 'SMU',
};

/** School terms JSON for `school.calendar.semestersKey` */
export function getSchoolTermUrl(
  semestersKey: string = DEFAULT_CALENDAR_KEYS.semestersKey
): string {
  return `${process.env.SCHOOL_SEMESTERS_URL}/${encodeURIComponent(semestersKey)}.json`;
}

/** Scraped important dates JSON for `school.calendar.importantDatesKey` */
export function getImportantDatesUrl(
  importantDatesKey: string = DEFAULT_CALENDAR_KEYS.importantDatesKey
): string {
  return `${process.env.SMU_SCRAPER_URL}/${encodeURIComponent(importantDatesKey)}/important_dates.json`;
}
