import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #d9d9d9;
  margin-top: 8px;
  display: flex;
  flex-grow: 1;
  border-radius: 16px;
`;

interface Props {
  events: App.Calendar.Event[];
}

const Calendar: React.FC<Props> = function (props) {
  const { events } = props;

  return <Wrapper>ss</Wrapper>;
};

export default Calendar;
