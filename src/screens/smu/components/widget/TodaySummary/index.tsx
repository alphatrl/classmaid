import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';

import { useDataContext } from '@/screens/smu/contexts/DataContext';

import Calendar from './components/Calendar';
import TodayEvent from './components/TodayEvent';
import TodaysSummary from './components/TodaysSummary';

const subscribeNoop = () => () => {};

const TodaySummaryWidget: React.FC = function () {
  const { currentEvent, calendarEvents } = useDataContext();
  // false during SSR and hydration, true once rendering on the client
  const mounted = React.useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  const today = moment();

  const todayEvents = React.useMemo(() => {
    if (!mounted || calendarEvents == null) {
      return [];
    }

    const midnight = moment(today).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const events = calendarEvents[`${midnight.unix()}`] ?? [];

    return events.filter((calEvent) => {
      const eventEnd = moment.unix(calEvent.endDate);
      return today.isSameOrBefore(eventEnd);
    });
  }, [calendarEvents, today, mounted]);

  // Render nothing until client mount (the grid card is the placeholder) to
  // avoid hydration mismatch caused by moment() producing different times on
  // server vs client
  if (!mounted) {
    return null;
  }

  return (
    <Link
      href="/smu/calendar"
      className="no-underline box-border flex h-full flex-col p-4"
    >
      <TodayEvent currentEvent={currentEvent} />
      <TodaysSummary todayMoment={today} numOfEvents={todayEvents.length} />
      <Calendar events={todayEvents} />
    </Link>
  );
};

export default TodaySummaryWidget;
