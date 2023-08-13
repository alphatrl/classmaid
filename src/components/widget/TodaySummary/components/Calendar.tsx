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

interface Props {
  events: App.Calendar.Event[];
}

const Calendar: React.FC<Props> = function (props) {
  const { events } = props;

  const trimmedEvents = events.length > 3 ? events.slice(0, 3) : events;

  return (
    <Wrapper>
      {trimmedEvents.map((calEvent, index) => (
        <CalendarEvent key={index} calendarEvent={calEvent} />
      ))}
    </Wrapper>
  );
};

export default Calendar;
