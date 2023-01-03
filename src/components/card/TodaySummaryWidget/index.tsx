import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import useMediaQuery from '../../../hooks/useMediaQuery';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE,
  WIDGET_WIDTH_SIZE_L,
  WIDGET_WIDTH_SIZE_M,
  WIDGET_WIDTH_SIZE_S,
} from '../../../themes/size';
import { CardTemplate } from '../styled';
import Calendar from './components/Calendar';
import TodayEvent from './components/TodayEvent';
import TodaysSummary from './components/TodaysSummary';

const Card = styled(CardTemplate)`
  display: flex;
  flex-direction: column;
`;

const TodaySummaryWidget: React.FC = function () {
  const { calendarEvents } = useDataContext();
  const today = moment();

  const isDesktopMSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_M})`);
  const isDesktopSSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_S})`);
  const isMobileSize = useMediaQuery(`(max-width: ${MOBILE_WIDTH_SIZE})`);

  const widgetSize = React.useMemo(() => {
    if (isMobileSize) {
      return WIDGET_WIDTH_SIZE_S;
    }

    if (isDesktopMSize || isDesktopSSize) {
      return WIDGET_WIDTH_SIZE_M;
    }

    return WIDGET_WIDTH_SIZE_L;
  }, [isDesktopMSize, isDesktopSSize, isMobileSize]);

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

    const events = calendarEvents[`${midnight.unix()}`];

    // NOTE: (hello@amostan.me) Check for event which are currently ongoing
    return events.filter((calEvent) => {
      const eventEnd = moment.unix(calEvent.endDate);
      return today.isSameOrBefore(eventEnd);
    });
  }, [calendarEvents, today]);

  return (
    <Card width={widgetSize}>
      <TodayEvent />
      <TodaysSummary todayMoment={today} numOfEvents={todayEvents.length} />
      <Calendar events={todayEvents} />
    </Card>
  );
};

export default TodaySummaryWidget;
