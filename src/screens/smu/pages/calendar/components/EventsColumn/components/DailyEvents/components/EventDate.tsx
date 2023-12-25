import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

interface Props {
  timestamp: string;
}

const Wrapper = styled.h3<{ $today: boolean }>`
  margin: 0;
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
  color: ${(props) =>
    props.$today ? props.theme.calendar.red : props.theme.textColor[10]};
`;

const EventDate: React.FC<Props> = function (props) {
  const { timestamp } = props;

  const dateUnixNumber = Number(timestamp);
  const dateMoment = moment.unix(dateUnixNumber);

  const isToday = React.useMemo(() => {
    const todayMidnight = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    return todayMidnight.isSame(dateMoment);
  }, [dateMoment]);

  const title = dateMoment.format('D MMMM, dddd');

  return <Wrapper $today={isToday}>{title}</Wrapper>;
};

export default EventDate;
