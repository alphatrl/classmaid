import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import React from 'react';

import GridLayout from './components/GridLayout';
import { CalendarValue } from './types';

const Calendar: React.FC = function () {
  const { push, pathname } = useRouter();
  const [value, onValueChange] = React.useState<CalendarValue>(new Date());

  const handleValueSelected = React.useCallback(
    (newValue: CalendarValue) => {
      onValueChange(newValue);
      if (newValue == null) {
        return;
      }

      if (Array.isArray(newValue)) {
        return;
      }

      const newDateTimestamp = moment(newValue).unix();
      push(`${pathname}#${newDateTimestamp}`);
    },
    [pathname, push]
  );

  return <GridLayout value={value} onValueChange={handleValueSelected} />;
};

export default Calendar;
