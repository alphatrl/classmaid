import React from 'react';
import styled from 'styled-components';

import { MOBILE_MEDIA_QUERY } from '../../../shared/themes/size';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: pink;
  flex: 1;

  @media screen and ${MOBILE_MEDIA_QUERY} {
    padding: 16px 0;
    justify-content: center;
  }
`;

const Calendar: React.FC = function () {
  return (
    <Wrapper>
      <h1>WIP</h1>
    </Wrapper>
  );
};

export default Calendar;
