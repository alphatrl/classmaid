import { IMPORTANT_DATES_URL, SCHOOL_TERM_URL } from '../constants';

export default async function getSchoolTermsAndImportantDates() {
  const requestFetchPromises = await Promise.all([
    fetch(SCHOOL_TERM_URL),
    fetch(IMPORTANT_DATES_URL),
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
