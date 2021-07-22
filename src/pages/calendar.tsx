import React from 'react';
import styled from 'styled-components';

import { CalendarList } from '../components/Card';
import DefaultLayout from '../layouts/DefaultLayout';

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  height: 100vh;
  // grid-template-columns: 1fr 2fr;
  // column-gap: 16px;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const Calendar: React.FC = () => {
  return (
    <DefaultLayout title="Calendar">
      <Wrapper>
        <CalendarList />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Calendar;
