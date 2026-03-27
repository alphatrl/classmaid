import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';

import { useDataContext } from '../../../contexts/DataContext';
import { CardTemplate } from '../styled';
import Calendar from './components/Calendar';
import TodayEvent from './components/TodayEvent';
import TodaysSummary from './components/TodaysSummary';

const TodaySummaryWidget: React.FC = function () {
  const { currentEvent, calendarEvents } = useDataContext();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  // Render a placeholder until client mount to avoid hydration mismatch
  // caused by moment() producing different times on server vs client
  if (!mounted) {
    return <CardTemplate className="flex flex-col" />;
  }

  return (
    <Link href="/smu/calendar" className="no-underline">
      <CardTemplate className="flex flex-col">
        <TodayEvent currentEvent={currentEvent} />
        <TodaysSummary todayMoment={today} numOfEvents={todayEvents.length} />
        <Calendar events={todayEvents} />
      </CardTemplate>
    </Link>
  );
};

export default TodaySummaryWidget;
