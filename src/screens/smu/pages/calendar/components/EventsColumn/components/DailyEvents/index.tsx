import React from 'react';

import EventDate from './components/EventDate';
import EventItem from './components/EventItem';

interface Props {
  timestamp: string;
  events: App.Calendar.Event[];
}

const DailyEvents: React.FC<Props> = function (props) {
  const { timestamp, events } = props;

  return (
    <div className="mb-2.5" id={timestamp}>
      <EventDate timestamp={timestamp} />
      <div className="grid flex-col gap-0.5">
        {events.map((item, index) => {
          return (
            <EventItem
              event={item}
              key={`${timestamp}-${item.title}-${index}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DailyEvents;
