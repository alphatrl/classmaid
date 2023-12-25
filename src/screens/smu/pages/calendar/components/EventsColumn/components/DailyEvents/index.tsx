import React from 'react';
import styled from 'styled-components';

import EventDate from './components/EventDate';
import EventItem from './components/EventItem';

interface Props {
  timestamp: string;
  events: App.Calendar.Event[];
}

const Wrapper = styled.div`
  margin-bottom: 0.6rem;
`;

const EventsWrapper = styled.div`
  display: grid;
  flex-direction: column;
  grid-gap: 0.2rem;
`;

const DailyEvents: React.FC<Props> = function (props) {
  const { timestamp, events } = props;

  return (
    <Wrapper id={timestamp}>
      <EventDate timestamp={timestamp} />
      <EventsWrapper>
        {events.map((item, index) => {
          return (
            <EventItem
              event={item}
              key={`${timestamp}-${item.title}-${index}`}
            />
          );
        })}
      </EventsWrapper>
    </Wrapper>
  );
};

export default DailyEvents;
