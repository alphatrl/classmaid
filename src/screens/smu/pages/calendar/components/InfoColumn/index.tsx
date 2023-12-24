import 'react-calendar/dist/Calendar.css';

import React from 'react';
import Calendar, { MonthView } from 'react-calendar';
import styled from 'styled-components';

import { CalendarValue } from '../../types';

const Wrapper = styled.div`
  grid-area: info;
  box-sizing: border-box;
  overflow: hidden;
  padding: 16px;

  border-radius: 24px;
  background-color: ${(props) => props.theme.appColor[100]}42;
  backdrop-filter: blur(12px) saturate(86%);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.25);
`;

const CalendarWrapper = styled.div`
  .react-calendar * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }

  .react-calendar {
    background: unset;
    border: unset;

    button {
      border-radius: 12px;
    }
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__tile--now,
  .react-calendar__tile--now:hover {
    background: none;
    abbr {
      font-weight: 600;
      color: ${(props) => props.theme.primary[50]};
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.theme.textColor[10]};
  }

  .react-calendar__tile--active {
    background: ${(props) => props.theme.primary[30]};
    color: ${(props) => props.theme.primary[50]};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${(props) => props.theme.primary[30]};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${(props) => props.theme.textColor[50]};
  }
`;

interface Props {
  value: CalendarValue;
  onChange: (newValue: CalendarValue) => void;
}

const InfoColumn: React.FC<Props> = function (props) {
  const { value, onChange } = props;

  return (
    <Wrapper>
      <CalendarWrapper>
        <Calendar value={value} onChange={onChange} />
      </CalendarWrapper>
    </Wrapper>
  );
};

export default InfoColumn;
