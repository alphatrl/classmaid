import moment from 'moment-timezone';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../../../contexts/DataContext';
import LoadingCalendar from './LoadingCalendar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: 1.05em;
  font-weight: 600;
  color: ${(props) => props.theme.text600};
  padding-bottom: 4px;
`;

const CalendarRow = styled.div`
  background-color: ${(props) => props.theme.calendar.red};
  border-radius: 12px;
  padding: 6px 12px;
  margin-top: 4px;

  h3,
  p {
    font-size: 0.8em;
    margin: 0;
    color: ${(props) => props.theme.calendar.textLight};
  }

  h3 {
    font-weight: 600;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    margin-bottom: 4px;
  }
`;

const MoreEvents = styled.p`
  color: ${(props) => props.theme.text600};
  font-weight: 500;
  font-size: 0.85em;
  margin: 0;
  margin-top: 8px;
  line-height: 1.5;
`;

const CalendarEvents: React.FC = () => {
  const { calendarEvents } = useDataContext();
  const today = moment();

  const todayEvents = useMemo(() => {
    if (!calendarEvents) {
      return null;
    }

    // get currently happening events
    const midnight = moment(today).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const events = calendarEvents[`${midnight.unix()}`];

    if (!events) {
      return [];
    }

    // check events which are occuring right now
    return events.filter((calEvent) => {
      const eventEnd = moment.unix(calEvent.endDate);
      return today.isSameOrBefore(eventEnd);
    });
  }, [calendarEvents, today]);

  const displayEvents = useCallback(() => {
    if (!todayEvents || !calendarEvents) {
      return null;
    }

    const tomorrow = moment(today).add(1, 'day').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (todayEvents.length === 0) {
      const tomorrowEvents = calendarEvents[`${tomorrow.unix()}`];
      const count = tomorrowEvents?.length || 0;

      const tomorrowMessage =
        count === 0
          ? 'There are no events tomorrow'
          : `There is ${count} ${count === 1 ? 'event' : 'events'} tomorrow`;

      return (
        <MoreEvents>
          No more events today
          <br />
          {tomorrowMessage}
        </MoreEvents>
      );
    }

    return todayEvents.slice(0, 3).map((calEvent, index) => (
      <CalendarRow key={index}>
        <h3>{calEvent.title}</h3>
        <p>{calEvent.timeString}</p>
      </CalendarRow>
    ));
  }, [calendarEvents, today, todayEvents]);

  if (!todayEvents) {
    return (
      <Wrapper>
        <SubTitle>{today.format('dddd, D MMMM')}</SubTitle>
        <LoadingCalendar />
      </Wrapper>
    );
  }

  const hiddenEventsCount = todayEvents.length > 3 ? todayEvents.length - 3 : 0;

  return (
    <Wrapper>
      <SubTitle>{today.format('dddd, D MMMM')}</SubTitle>
      {displayEvents()}
      {hiddenEventsCount > 0 && (
        <MoreEvents>
          +{hiddenEventsCount} more {hiddenEventsCount > 1 ? 'events' : 'event'}
        </MoreEvents>
      )}
    </Wrapper>
  );
};

export default CalendarEvents;
