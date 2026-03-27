import classnames from 'classnames';
import React from 'react';

import CalendarEvent from './components/CalendarEvent';

interface Props {
  events: App.Calendar.Event[];
}

const Calendar: React.FC<Props> = function (props) {
  const { events } = props;

  if (events.length === 0) {
    return (
      <div
        className={classnames(
          'bg-gray-200 dark:bg-gray-700 mt-2',
          'flex flex-1 items-center rounded-2xl p-2',
          'text-gray-400 dark:text-gray-400'
        )}
      >
        No events today
      </div>
    );
  }

  const trimmedEvents = events.length > 3 ? events.slice(0, 3) : events;
  return (
    <div
      className={classnames(
        'bg-gray-200 dark:bg-gray-700 mt-2',
        'grid flex-1 grid-rows-[repeat(3,minmax(auto,1fr))]',
        'gap-1 rounded-3xl p-2'
      )}
    >
      {trimmedEvents.map((calEvent) => (
        <CalendarEvent key={calEvent.title} calendarEvent={calEvent} />
      ))}
    </div>
  );
};

export default Calendar;
