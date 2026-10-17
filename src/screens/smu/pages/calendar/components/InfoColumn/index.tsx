import React from 'react';
import Calendar from 'react-calendar';

import { cn } from '@/lib/utils';
import { ColumnWrapper } from '@/screens/smu/pages/calendar/styled';
import { CalendarValue } from '@/screens/smu/pages/calendar/types';

interface Props {
  value: CalendarValue;
  onChange: (newValue: CalendarValue) => void;
}

const InfoColumn: React.FC<Props> = function (props) {
  const { value, onChange } = props;

  return (
    <ColumnWrapper
      className={cn(
        'h-full bg-white/75 dark:bg-black/75',
        'backdrop-blur-md backdrop-saturate-86'
      )}
    >
      <div className="calendar-wrapper">
        <Calendar value={value} onChange={onChange} />
      </div>
    </ColumnWrapper>
  );
};

export default InfoColumn;
