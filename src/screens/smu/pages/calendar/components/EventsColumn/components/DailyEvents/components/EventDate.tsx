import moment from 'moment-timezone';
import React from 'react';

interface Props {
  timestamp: string;
}

const EventDate: React.FC<Props> = function (props) {
  const { timestamp } = props;

  const dateUnixNumber = Number(timestamp);
  const dateMoment = moment.unix(dateUnixNumber);

  const isToday = React.useMemo(() => {
    const todayMidnight = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return todayMidnight.isSame(dateMoment);
  }, [dateMoment]);

  const title = dateMoment.format('D MMMM, dddd');

  return (
    <h3
      className={`m-0 mb-1.5 text-lg ${isToday ? 'text-rose-600 dark:text-rose-600' : 'text-gray-700 dark:text-gray-200'}`}
    >
      {title}
    </h3>
  );
};

export default EventDate;
