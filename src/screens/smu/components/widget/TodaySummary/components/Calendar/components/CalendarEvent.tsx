import classnames from 'classnames';
import React from 'react';

interface Props {
  calendarEvent: App.Calendar.Event;
}

const CalendarEvent: React.FC<Props> = function (props) {
  const { calendarEvent } = props;

  return (
    <div
      className={classnames(
        'flex cursor-pointer flex-row items-center px-2',
        'hover:bg-rose-600/[0.07] hover:rounded-xl'
      )}
    >
      <div className="me-2 bg-rose-600 w-1 h-3/4 rounded-sm" />
      <div className="w-full flex flex-col justify-center">
        <h3
          className={classnames(
            'm-0 font-semibold text-[0.9em]',
            'text-gray-700 dark:text-gray-200',
            '[-webkit-box-orient:vertical] [-webkit-line-clamp:1]',
            '[display:-webkit-box] overflow-hidden'
          )}
        >
          {calendarEvent.title}
        </h3>
        <p
          className={classnames(
            'm-0 mt-0.5 font-medium text-[0.85em]',
            'text-gray-400 dark:text-gray-400'
          )}
        >
          {calendarEvent.timeString}
        </p>
      </div>
    </div>
  );
};

export default CalendarEvent;
