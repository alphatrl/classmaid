import React from 'react';
import styled from 'styled-components';

import useScreenSize from '../../../../shared/hooks/useScreenSize';
import useWidgetSize from '../../../../shared/hooks/useWidgetSize';
import { MOBILE_MEDIA_QUERY } from '../../../../shared/themes/size';
import EventsColumn from './components/EventsColumn';
import InfoColumn from './components/InfoColumn';
import { CalendarValue } from './types';

const Wrapper = styled.div<{ $infoColumnWidth: number }>`
  display: grid;
  grid-template-areas: 'info events';
  grid-template-columns: ${(props) => props.$infoColumnWidth}px 1fr;
  grid-gap: 1rem;
  flex: 1;
  height: 100%;

  @media screen and ${MOBILE_MEDIA_QUERY} {
    justify-content: center;
    grid-template-areas: 'events';
    grid-template-columns: 1fr;
  }
`;

const Calendar: React.FC = function () {
  const widgetSize = useWidgetSize('small');
  const { isMobile } = useScreenSize();

  const [value, onValueChange] = React.useState<CalendarValue>(new Date());

  return (
    <Wrapper $infoColumnWidth={widgetSize.width}>
      {!isMobile && <InfoColumn value={value} onChange={handleValueSelected} />}
      <EventsColumn />
    </Wrapper>
  );
};

export default Calendar;
