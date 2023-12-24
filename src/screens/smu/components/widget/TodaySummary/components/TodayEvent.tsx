import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../../contexts/DataContext';
import { getDateStringToMoment } from '../utils/getDateStringToMoment';
import TodayEventLoading from './TodayEventLoading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor[50]};

  h1 {
    margin: 0;
    font-size: 2.25rem;
    line-height: 96%;
  }
`;

const DaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding-bottom: 8px;
  color: ${(props) => props.theme.textColor[10]};

  span {
    font-weight: 600;
    padding: 0 8px;
    font-size: 1.5em;
  }
`;

const HighlightText = styled.h1`
  color: ${(props) => props.theme.primary[50]};
`;

interface Props {
  currentEvent: App.Calendar.CurrentEvent | null;
}

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

  if (event == null) {
    return (
      <Wrapper>
        <TodayEventLoading />
      </Wrapper>
    );
  }

  if (event?.type === 'VACATION') {
    return (
      <Wrapper>
        <DaysWrapper>
          <h1>{event?.title}</h1>
          <span>OF</span>
        </DaysWrapper>
        <HighlightText>{event?.type}</HighlightText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <HighlightText>{event?.title}</HighlightText>
    </Wrapper>
  );
};

export default TodayEvent;
