import { Moment } from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 8px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor[30]};

  span {
    margin: 0;
  }
`;

interface Props {
  todayMoment: Moment;
  numOfEvents: number;
}

const TodaysSummary: React.FC<Props> = function (props) {
  const { todayMoment, numOfEvents } = props;
  const todayDate = todayMoment.format('dddd, D MMMM');

  return (
    <Wrapper>
      <span>{todayDate}</span>
      <span>{` · ${numOfEvents} `}</span>
      <span>{numOfEvents === 1 ? 'event' : 'events'}</span>
    </Wrapper>
  );
};

export default TodaysSummary;
