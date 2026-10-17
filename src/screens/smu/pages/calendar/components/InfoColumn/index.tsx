import React from 'react';
import Calendar from 'react-calendar';

import { CalendarValue } from '@/screens/smu/pages/calendar/types';

interface Props {
  value: CalendarValue;
  onChange: (newValue: CalendarValue) => void;
}

const InfoColumn: React.FC<Props> = function (props) {
  const { value, onChange } = props;

  return (
    <div className="calendar-wrapper">
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};

export default InfoColumn;
