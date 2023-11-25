import React from 'react';
import styled from 'styled-components';

import { WIDGET_L_WIDTH_SIZE_S } from '../../../../../shared/themes/size';
import { CardTemplate } from '../styled';
import TodayEvent from '../TodaySummary/components/TodayEvent';
import CalendarRow from './components/CalendarRow';

const Wrapper = styled(CardTemplate)``;

const CalendarInformation = styled.div`
  margin-top: 60px;
  h1 {
    margin: 0;
    font-size: 1.2em;
  }
`;

const TodayCard: React.FC = function () {
  return (
    <Wrapper width={WIDGET_L_WIDTH_SIZE_S} height={WIDGET_L_WIDTH_SIZE_S}>
      <TodayEvent />
      <CalendarInformation>
        <h1>Calendar</h1>
        <CalendarRow title="SMU Critical Date" />
      </CalendarInformation>
    </Wrapper>
  );
};

export default TodayCard;
