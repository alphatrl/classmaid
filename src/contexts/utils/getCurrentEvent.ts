import moment from 'moment-timezone';

import { CurrentEventProps, SchoolYearProps } from '../../Schema';

export default function getCurrentEvent(
  years: SchoolYearProps[]
): CurrentEventProps | null {
  if (!years || years.length === 0) {
    return null;
  }

  const today = moment();
  const allowedTerms = ['term_1', 'term_2'];

  for (const year of years) {
    for (const term of year.terms) {
      // check if term is part of the allowed terms
      if (!allowedTerms.includes(term.type)) {
        // console.log('not allowed');
        continue;
      }

      let termStart = null;
      for (const period of term.periods) {
        // check if current date is within the period dates
        const startDate = moment.tz(
          period.date_start,
          'DD-MM-YYYY',
          'Asia/Singapore'
        );

        // update termstart to be the first period
        if (termStart == null) {
          termStart = startDate;
        }
        // before the midnight of next day after endDate
        const endDate = moment
          .tz(period.date_end, 'DD-MM-YYYY', 'Asia/Singapore')
          .add(1, 'day');

        // date is between the period
        if (today.isBetween(startDate, endDate, undefined, '[)')) {
          if (period.type == 'recess' || period.type == 'vacation') {
            return {
              type: period.type,
              date_start: startDate.unix(),
              date_end: endDate.unix(),
            };
          }

          return {
            type: period.type,
            date_start: termStart.unix(),
            date_end: endDate.unix(),
          };
        }
        // console.log('end of period', period.type);
      }
      // console.log('end of term', term.label);
    }
    // console.log('end of year', year.label);
  }
  return null;
}
