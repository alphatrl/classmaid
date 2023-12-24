import React from 'react';
import styled from 'styled-components';

import useWidgetSize from '../../../../shared/hooks/useWidgetSize';
import { MOBILE_MEDIA_QUERY } from '../../../../shared/themes/size';
import EventsColumn from './components/EventsColumn';
import InfoColumn from './components/InfoColumn';
import { CalendarValue } from './types';

const Wrapper = styled.div<{ info_width: number }>`
  display: grid;
  grid-template-areas: 'info events';
  grid-template-columns: ${(props) => props.info_width}px 1fr;
  gap: 1rem;
  flex: 1;
  height: 100%;

  @media screen and ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
  }
`;

const Calendar: React.FC = function () {
  const widgetSize = useWidgetSize('small');

  const [value, onValueChange] = React.useState<CalendarValue>(new Date());

  return (
    <Wrapper info_width={widgetSize.width}>
      <InfoColumn value={value} onChange={onValueChange} />
      <EventsColumn />
    </Wrapper>
  );
};

export default Calendar;
