import React from 'react';
import styled from 'styled-components';
import AppLibrary from '../components/card/AppLibrary';

import TodaySummaryWidget from '../components/card/TodaySummary';
import DefaultLayout from '../layouts/DefaultLayout';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE,
} from '../themes/size';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding-top: 40px;
  padding-bottom: 64px;

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_M}) {
    width: 1000px;
  }

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    width: 800px;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE}) {
    width: 90%;
    justify-content: center;
  }
`;

export const Home: React.FC = function () {
  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <Wrapper>
          <TodaySummaryWidget />
          <AppLibrary />
        </Wrapper>
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default Home;
