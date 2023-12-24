import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

interface Props {
  timestamp: string;
}

const Wrapper = styled.div``;

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

  const day = dateMoment.format('D MMMM, dddd');
  const additionalInfo = dateMoment.format('ddd');

  return <Wrapper>{day}</Wrapper>;
};

export default EventDate;
