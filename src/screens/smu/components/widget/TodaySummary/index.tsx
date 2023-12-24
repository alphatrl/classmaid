import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../../../shared/hooks/useWidgetSize';
import { useDataContext } from '../../../contexts/DataContext';
import { CardTemplate } from '../styled';
import Calendar from './components/Calendar';
import TodayEvent from './components/TodayEvent';
import TodaysSummary from './components/TodaysSummary';

const Card = styled(CardTemplate)`
  display: flex;
  flex-direction: column;
`;

const CardLink = styled(Link)`
  text-decoration: none;
`;

const TodaySummaryWidget: React.FC = function () {
  const { calendarEvents } = useDataContext();
  const widgetSize = useWidgetSize('small');

  const today = moment();

  const todayEvents = React.useMemo(() => {
    if (calendarEvents == null) {
      return [];
    }

    // get currently happening events
    const midnight = moment(today).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const events = calendarEvents[`${midnight.unix()}`] ?? [];

    // NOTE: (hello@amostan.me) Check for event which are currently ongoing
    return events.filter((calEvent) => {
      const eventEnd = moment.unix(calEvent.endDate);
      return today.isSameOrBefore(eventEnd);
    });
  }, [calendarEvents, today]);

  return (
    <CardLink href="/smu/calendar">
      <Card width={widgetSize.width}>
        <TodayEvent />
        <TodaysSummary todayMoment={today} numOfEvents={todayEvents.length} />
        <Calendar events={todayEvents} />
      </Card>
    </CardLink>
  );
};

export default TodaySummaryWidget;
