import { Moment } from 'moment-timezone';
import React from 'react';

interface Props {
  todayMoment: Moment;
  numOfEvents: number;
}

const TodaysSummary: React.FC<Props> = function (props) {
  const { todayMoment, numOfEvents } = props;
  const todayDate = todayMoment.format('dddd, D MMMM');

  return (
    <div className="mt-1 font-semibold text-gray-400 dark:text-gray-400 [&_span]:m-0">
      <span>{todayDate}</span>
      <span>{` · ${numOfEvents} `}</span>
      <span>{numOfEvents === 1 ? 'event' : 'events'}</span>
    </div>
  );
};

export default TodaysSummary;
