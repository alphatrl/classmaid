import classnames from 'classnames';
import moment from 'moment-timezone';
import React from 'react';

import { useSmuEvents } from '../../../../contexts/SmuEventsContext';
import { ColumnWrapper } from '../../styled';
import DailyEvents from './components/DailyEvents';

const EventsColumn: React.FC = function () {
  const { calendarEvents } = useSmuEvents();
  const todayMidnight = moment().set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const todayTimestamp = `${todayMidnight.unix()}`;

  const todayEvents = React.useMemo(() => {
    if (calendarEvents == null) {
      return [];
    }

    const events = calendarEvents[todayTimestamp] ?? [];

    // NOTE: (hello@amostan.me) Keep events which are currently ongoing
    return events.filter((calEvent) => {
      const eventEnd = moment.unix(calEvent.endDate);
      return todayMidnight.isSameOrBefore(eventEnd);
    });
  }, [calendarEvents, todayMidnight, todayTimestamp]);

  const futureEvents = React.useMemo(() => {
    if (calendarEvents == null) {
      return [];
    }

    const calendarDates = Object.keys(calendarEvents);
    const futureDates = calendarDates.filter((date) => {
      return Number(date) > todayMidnight.unix();
    });

    return futureDates.map((date) => {
      return {
        timestamp: date,
        events: calendarEvents[date],
      };
    });
  }, [calendarEvents, todayMidnight]);

  return (
    <ColumnWrapper
      className={classnames(
        'h-full bg-white/75 dark:bg-black/75',
        'backdrop-blur-md backdrop-saturate-86'
      )}
    >
      <DailyEvents timestamp={todayTimestamp} events={todayEvents} />
      {futureEvents.map((dayEvents) => {
        return (
          <DailyEvents
            key={dayEvents.timestamp}
            timestamp={dayEvents.timestamp}
            events={dayEvents.events}
          />
        );
      })}
    </ColumnWrapper>
  );
};

export default EventsColumn;
