import moment from 'moment-timezone';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';

import TodayEventLoading from './TodayEventLoading';
import { getDateStringToMoment } from '../utils/getDateStringToMoment';

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
            className={cn(
              'flex flex-row items-end pb-2',
              'text-gray-700 dark:text-gray-200'
            )}
          >
            <h1 className={EventTitleClassName}>{event?.title}</h1>
            <span className="font-semibold px-2 text-lg">OF</span>
          </div>
          <h1 className={cn(EventTitleClassName, 'text-theme-500')}>
            {event.type.toUpperCase()}
          </h1>
        </>
      );
    }

    return (
      <h1 className={cn(EventTitleClassName, 'text-theme-500')}>
        {event.title}
      </h1>
    );
  }, [event]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col text-gray-200 dark:text-gray-700">
        {renderContents}
      </div>
      <Button
        variant="ghost"
        size="icon"
        asChild
        className={cn(
          'size-auto no-underline rounded-2xl flex p-2 transition-none',
          'items-start justify-start',
          'hover:bg-theme-200 dark:hover:bg-theme-200 hover:text-inherit',
          "[&_svg:not([class*='size-'])]:size-6"
        )}
      >
        {/* The whole widget is the link; a nested link is invalid HTML */}
        <span aria-hidden="true">
          <Icon name="maximize-2" className="text-theme-500" />
        </span>
      </Button>
    </div>
  );
};

export default TodayEvent;
