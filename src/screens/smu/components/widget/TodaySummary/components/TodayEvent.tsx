import classnames from 'classnames';
import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';

import Icon from '../../../../../../shared/components/Icon';
import { getDateStringToMoment } from '../utils/getDateStringToMoment';
import TodayEventLoading from './TodayEventLoading';

interface Props {
  currentEvent: App.Calendar.CurrentEvent | null;
}

const EventTitleClassName = 'm-0 text-4xl leading-[96%] font-bold';

const TodayEvent: React.FC<Props> = function (props) {
  const { currentEvent } = props;

  const event = React.useMemo(() => {
    if (currentEvent == null) {
      return null;
    }

    const today = moment();
    const startDate = getDateStringToMoment(currentEvent.date_start);
    const endDate = getDateStringToMoment(currentEvent.date_end);

    const isVacation = currentEvent.type === 'vacation';
    if (isVacation) {
      const isLastDay = endDate.diff(today, 'days') === 0;
      return {
        type: currentEvent.type,
        title: isLastDay
          ? 'LAST DAY'
          : `DAY ${today.diff(startDate, 'days') + 1}`,
      };
    }

    const isRecess = currentEvent.type === 'recess';
    const isExam = currentEvent.type === 'exam';
    let title = `Week ${currentEvent.week_no}`;

    if (isRecess) {
      title += ' (Recess)';
    } else if (isExam) {
      title += ' (Exam)';
    }

    return {
      type: currentEvent.type,
      title: title,
    };
  }, [currentEvent]);

  const renderContents = React.useMemo(() => {
    if (event == null) {
      return <TodayEventLoading />;
    }

    if (event.type === 'vacation') {
      return (
        <>
          <div
            className={classnames(
              'flex flex-row items-end pb-2',
              'text-gray-700 dark:text-gray-200'
            )}
          >
            <h1 className={EventTitleClassName}>{event?.title}</h1>
            <span className="font-semibold px-2 text-lg">OF</span>
          </div>
          <h1 className={classnames(EventTitleClassName, 'text-theme-500 ')}>
            {event.type.toUpperCase()}
          </h1>
        </>
      );
    }

    return (
      <h1 className={classnames(EventTitleClassName, 'text-theme-500 ')}>
        {event.title}
      </h1>
    );
  }, [event]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col text-gray-200 dark:text-gray-700">
        {renderContents}
      </div>
      <Link
        href="/smu/calendar"
        className={classnames(
          'no-underline rounded-2xl flex p-2',
          'hover:bg-theme-200'
        )}
      >
        <Icon
          name="open_in_full"
          className="text-theme-500 dark:text-theme-500"
        />
      </Link>
    </div>
  );
};

export default TodayEvent;
