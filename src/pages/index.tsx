import React from 'react';
import styled from 'styled-components';

import AppLibrary from '../components/widget/AppLibrary';
import LibraryCapacities from '../components/widget/LibraryCapacities';
import TodaySummaryWidget from '../components/widget/TodaySummary';
import DefaultLayout from '../layouts/DefaultLayout';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
  MOBILE_WIDTH_SIZE_S,
} from '../themes/size';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1020px;
  display: flex;
  flex-wrap: wrap;

  padding-top: 40px;
  padding-bottom: 64px;

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_M}) {
    width: 920px;
  }

  @media screen and (max-width: ${DESKTOP_WIDTH_SIZE_S}) {
    width: 700px;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_L}) {
    width: 90%;
  }

  @media screen and (max-width: ${MOBILE_WIDTH_SIZE_S}) {
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
          <LibraryCapacities />
        </Wrapper>
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default Home;
