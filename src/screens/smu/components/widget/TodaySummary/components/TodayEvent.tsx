import moment from 'moment-timezone';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import Icon from '../../../../../../shared/components/Icon';
import { getDateStringToMoment } from '../utils/getDateStringToMoment';
import TodayEventLoading from './TodayEventLoading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  border-radius: 16px;
  display: flex;

  padding: 8px 8px;
  margin-right: -8px;
  margin-top: -8px;

  width: 24px;
  height: 24px;

  &:hover {
    background-color: ${(props) => props.theme.primary[20]};
  }

  span {
    color: ${(props) => props.theme.primary[50]};
  }
`;

const EventWrapper = styled.div`
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
          <DaysWrapper>
            <h1>{event?.title}</h1>
            <span>OF</span>
          </DaysWrapper>
          <HighlightText>{event.type.toUpperCase()}</HighlightText>
        </>
      );
    }

    return <HighlightText>{event.title}</HighlightText>;
  }, [event]);

  return (
    <Wrapper>
      <EventWrapper>{renderContents}</EventWrapper>
      <CustomLink href="/smu/calendar">
        <Icon name="open_in_full" />
      </CustomLink>
    </Wrapper>
  );
};

export default TodayEvent;
