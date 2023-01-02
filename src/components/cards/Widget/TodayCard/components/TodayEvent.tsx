import moment, { Moment } from 'moment-timezone';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../../../contexts/DataContext';
import LoadingToday from './LoadingToday';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  color: ${(props) => props.theme.text900};

  h1 {
    margin: 0;
    font-size: 2.6rem;
    font-weight: 00;
    line-height: 96%;
  }

  span {
    font-weight: 600;
    padding: 0 8px;
    font-size: 1.5em;
  }

  .highlight {
    color: ${(props) => props.theme.primary.blue};
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 8px;
`;

const getDateStringToMoment = function (
  dateString: string,
  format = 'YYYY-MM-DD'
): Moment {
  return moment.tz(dateString, format, 'Asia/Singapore');
};

const TodayEvent: React.FC = function () {
  const { currentEvent } = useDataContext();

  const event = useMemo(() => {
    if (!currentEvent) {
      return null;
    }

    const today = moment();
    const startDate = getDateStringToMoment(currentEvent.date_start);
    const endDate = getDateStringToMoment(currentEvent.date_end);

    const isVacation = currentEvent.type === 'vacation';
    if (isVacation) {
      const isLastDay = endDate.diff(today, 'days') === 0;
      return {
        type: currentEvent.type.toUpperCase(),
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

  if (!currentEvent || !event) {
    return (
      <Wrapper>
        <LoadingToday />
      </Wrapper>
    );
  }

  if (event.type === 'VACATION') {
    return (
      <Wrapper>
        <DaysWrapper>
          <h1>{event.title}</h1>
          <span>OF</span>
        </DaysWrapper>
        <h1 className="highlight">{event.type}</h1>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1 className="highlight">{event.title}</h1>
    </Wrapper>
  );
};

export default TodayEvent;
