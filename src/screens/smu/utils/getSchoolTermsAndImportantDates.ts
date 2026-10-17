import { getSchoolConfig } from '@/lib/content/schools';

import {
  DEFAULT_CALENDAR_KEYS,
  getImportantDatesUrl,
  getSchoolTermUrl,
} from '../constants';

/** Build-time fetch of the calendar data; keys come from data/schools/<slug>.json. */
export default async function getSchoolTermsAndImportantDates(slug = 'smu') {
  const calendar = getSchoolConfig(slug)?.calendar ?? DEFAULT_CALENDAR_KEYS;

  const requestFetchPromises = await Promise.all([
    fetch(getSchoolTermUrl(calendar.semestersKey)),
    fetch(getImportantDatesUrl(calendar.importantDatesKey)),
  ]);

  const schoolTermsJson = await requestFetchPromises[0].json();
  const importantDates =
    (await requestFetchPromises[1].json()) as App.Calendar.ImportantDate[];
  const schoolTerms = schoolTermsJson.terms as App.Calendar.SchoolTerm[];

  return {
    schoolTerms,
    importantDates,
  };
}
