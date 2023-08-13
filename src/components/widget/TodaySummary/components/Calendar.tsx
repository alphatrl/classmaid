import React from 'react';
import styled from 'styled-components';

import CalendarEvent from '../../../calendar/CalendarEvent';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.appColor[90]};
  margin-top: 8px;
  display: flex;
  flex: 1;
  flex-direction: column;

  border-radius: 16px;
  padding: 8px;
`;

const EmptyWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const EmptyText = styled.p`
  color: ${(props) => props.theme.textColor[30]};
`;

interface Props {
  events: App.Calendar.Event[];
}

const Calendar: React.FC<Props> = function (props) {
  const { events } = props;

  const renderEvents = React.useCallback(() => {
    if (events.length === 0) {
      return (
        <EmptyWrapper>
          <EmptyText>No more events today</EmptyText>
        </EmptyWrapper>
      );
    }

    const trimmedEvents = events.length > 3 ? events.slice(0, 3) : events;
    return trimmedEvents.map((calEvent) => (
      <CalendarEvent key={calEvent.title} calendarEvent={calEvent} />
    ));
  }, [events]);

  return <Wrapper>{renderEvents()}</Wrapper>;
};

export default Calendar;
