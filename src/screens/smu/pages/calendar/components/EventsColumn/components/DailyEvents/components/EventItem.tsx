import React from 'react';
import styled from 'styled-components';

import { MOBILE_MEDIA_QUERY } from '../../../../../../../../../shared/themes/size';

interface Props {
  event: App.Calendar.Event;
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;

  &:hover {
    background-color: ${(props) => props.theme.calendar.red}12;
    border-radius: 12px;
  }
`;

const DecorationLine = styled.div`
  margin-inline-end: 0.5rem;
  background-color: ${(props) => props.theme.calendar.red};

  width: 4px;
  height: 85%;
  border-radius: 4px;
`;

const TextContents = styled.div`
  box-sizing: border-box;

  display: flex;
  flex: 1;

  flex-direction: column;
  justify-content: center;
`;

const EventTitle = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
  color: ${(props) => props.theme.textColor[10]};

  // NOTE: (hello@amostan.me) This is to truncate the title into 1 line with ellipsis
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  overflow: hidden;

  @media screen and ${MOBILE_MEDIA_QUERY} {
    -webkit-line-clamp: 2;
  }
`;

const EventTimings = styled.p`
  margin: 0;
  margin-top: 2px;
  font-weight: 500;
  font-size: 0.85rem;
  color: ${(props) => props.theme.textColor[30]};
`;

const EventItem: React.FC<Props> = function (props) {
  const { event } = props;

  return (
    <Wrapper>
      <DecorationLine />
      <TextContents>
        <EventTitle>{event.title}</EventTitle>
        <EventTimings>{event.timeString}</EventTimings>
      </TextContents>
    </Wrapper>
  );
};

export default EventItem;
