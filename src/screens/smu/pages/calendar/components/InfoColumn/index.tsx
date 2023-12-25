import 'react-calendar/dist/Calendar.css';

import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';

import { ColumnWrapper } from '../../styled';
import { CalendarValue } from '../../types';

const Wrapper = styled(ColumnWrapper)`
  grid-area: info;
  background-color: ${(props) => props.theme.appColor[100]}ED;
  backdrop-filter: blur(12px) saturate(86%);
  -webkit-backdrop-filter: blur(12px) saturate(86%);
`;

const ReactCalendarWrapper = styled.div`
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
    background: ${(props) => props.theme.primary[10]};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${(props) => props.theme.textColor[40]};
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
      <ReactCalendarWrapper>
        <Calendar value={value} onChange={onChange} />
      </ReactCalendarWrapper>
    </Wrapper>
  );
};

export default InfoColumn;
