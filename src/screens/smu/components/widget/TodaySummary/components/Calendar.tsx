import React from 'react';
import styled from 'styled-components';

import CalendarEvent from '../../../calendar/CalendarEvent';

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.appColor[90]};
  margin-top: 8px;
  display: grid;
  flex: 1;
  grid-template-rows: repeat(3, minmax(auto, 1fr));
  grid-gap: 4px;

  border-radius: 16px;
  padding: 8px;
`;

const EmptyWrapper = styled(Wrapper)`
  display: flex;
  flex: 1;
  align-items: center;
  color: ${(props) => props.theme.textColor[30]};
`;

interface Props {
  events: App.Calendar.Event[];
}

const Calendar: React.FC<Props> = function (props) {
  const { events } = props;

  if (events.length === 0) {
    return <EmptyWrapper>No events today</EmptyWrapper>;
  }

  const trimmedEvents = events.length > 3 ? events.slice(0, 3) : events;
  return (
    <Wrapper>
      {trimmedEvents.map((calEvent) => (
        <CalendarEvent key={calEvent.title} calendarEvent={calEvent} />
      ))}
    </Wrapper>
  );
};

export default Calendar;
