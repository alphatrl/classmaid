import React from 'react';
import styled from 'styled-components';

import EventDate from './components/EventDate';

interface Props {
  timestamp: string;
  events: App.Calendar.Event[];
}

const Wrapper = styled.div``;

const DailyEvents: React.FC<Props> = function (props) {
  const { timestamp, events } = props;

  return (
    <Wrapper>
      <EventDate timestamp={timestamp} />
    </Wrapper>
  );
};

export default DailyEvents;
