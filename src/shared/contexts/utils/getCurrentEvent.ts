import moment, { Moment } from 'moment-timezone';

const getDateStringToMoment = function (
  dateString: string,
  format = 'YYYY-MM-DD'
): Moment {
  return moment.tz(dateString, format, 'Asia/Singapore');
};

export default function getCurrentEvent(
  terms: App.Calendar.SchoolTerm[]
): App.Calendar.CurrentEvent | null {
  if (!terms || terms.length === 0) {
    return null;
  }

  const today = moment();

  for (const term of terms) {
    const periods = term.periods;

    // check if start_dates and end_dates of current term fall within today's dates
    const termStartDateString = periods[0].date_start;
    const termEndDateString = periods[periods.length - 1].date_end;
    const termStart = getDateStringToMoment(termStartDateString);
    const termEnd = getDateStringToMoment(termEndDateString);

    if (!today.isBetween(termStart, termEnd, undefined, '[)')) {
      continue;
    }

    for (const period of periods) {
      // check if fall between start_date and end_date of period
      const periodStartDate = getDateStringToMoment(period.date_start);
      const periodEndDate = getDateStringToMoment(period.date_end);

      if (today.isBetween(periodStartDate, periodEndDate, undefined, '[)')) {
        return period;
      }
    }
  }

  return null;
}
