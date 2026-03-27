import classnames from 'classnames';
import React from 'react';

interface Props {
  event: App.Calendar.Event;
}

const EventItem: React.FC<Props> = function (props) {
  const { event } = props;

  return (
    <div
      className={classnames(
        'box-border flex flex-row items-center p-2',
        'hover:bg-rose-600/[0.07] hover:rounded-xl'
      )}
    >
      <div className="me-2 bg-rose-600 w-1 h-[85%] rounded-sm" />
      <div className="box-border flex flex-1 flex-col justify-center">
        <h4
          className={classnames(
            'm-0 font-semibold text-base',
            'text-gray-700 dark:text-gray-200',
            '[-webkit-box-orient:vertical]',
            'line-clamp-1 max-md:line-clamp-2',
            '[display:-webkit-box] overflow-hidden'
          )}
        >
          {event.title}
        </h4>
        <p
          className={classnames(
            'm-0 mt-0.5 font-medium text-sm',
            'text-gray-400 dark:text-gray-400'
          )}
        >
          {event.timeString}
        </p>
      </div>
    </div>
  );
};

export default EventItem;
