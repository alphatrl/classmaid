import moment, { Moment } from 'moment-timezone';

export function getDateStringToMoment(
  dateString: string,
  format = 'YYYY-MM-DD'
): Moment {
  return moment.tz(dateString, format, 'Asia/Singapore');
}
