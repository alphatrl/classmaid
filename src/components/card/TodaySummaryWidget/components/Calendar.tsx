import React from 'react';
import styled from 'styled-components';

import useMediaQuery from '../../../../hooks/useMediaQuery';
import { DESKTOP_WIDTH_SIZE_L } from '../../../../themes/size';
import CalendarEvent from '../../../calendar/CalendarEvent';

const Wrapper = styled.div`
  background-color: #e6e6e6;
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
  const isDesktopLSize = useMediaQuery(`(max-width: ${DESKTOP_WIDTH_SIZE_L})`);

  const maxNumOfEvents = React.useMemo(() => {
    if (isDesktopLSize) {
      return 4;
    }

    return 3;
  }, [isDesktopLSize]);

  const trimmedEvents =
    events.length > 3 ? events.slice(0, maxNumOfEvents) : events;

  return (
    <Wrapper>
      {trimmedEvents.map((calEvent, index) => (
        <CalendarEvent key={index} calendarEvent={calEvent} />
      ))}
    </Wrapper>
  );
};

export default Calendar;
