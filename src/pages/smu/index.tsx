import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import AppLibrary from '../../screens/smu/components/widget/AppLibrary';
import LibraryCapacities from '../../screens/smu/components/widget/LibraryCapacities';
import TodaySummaryWidget from '../../screens/smu/components/widget/TodaySummary';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';
import {
  MOBILE_MEDIA_QUERY,
  TABLET_MEDIA_QUERY,
} from '../../shared/themes/size';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1035px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 36px;
  padding-bottom: 64px;

  @media screen and ${TABLET_MEDIA_QUERY} {
    width: 690px;
  }

  @media screen and ${MOBILE_MEDIA_QUERY} {
    padding: 16px 0;
    width: 350px;
    justify-content: center;
  }
`;

export const Home: NextPage = function () {
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
