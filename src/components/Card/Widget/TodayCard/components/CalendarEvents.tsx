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
    color: #ffffff;
  }

  h3 {
    font-weight: 600;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    overflow: hidden;
    color: #ffffff;
  }
`;

const MoreEvents = styled.p`
  font-size: 0.8em;
  margin: 0;
  margin-top: 8px;
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
    return !events ? [] : events;
  }, [calendarEvents, today]);

  const displayEvents = useCallback(() => {
    if (!todayEvents || !calendarEvents) {
      return null;
    }

    const tomorrow = moment(today).set({
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (todayEvents.length === 0) {
      const tomorrowEvents = calendarEvents[`${tomorrow.unix()}`];
      const count = tomorrowEvents.length;
      return (
        <MoreEvents>
          There is {count} more {count === 1 ? 'event' : 'events'}
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
