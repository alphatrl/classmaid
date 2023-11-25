import type { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import AppLibrary from '../../screens/smu/components/widget/AppLibrary';
import LibraryCapacities from '../../screens/smu/components/widget/LibraryCapacities';
import TodaySummaryWidget from '../../screens/smu/components/widget/TodaySummary';
import DefaultLayout from '../../shared/components/layouts/DefaultLayout';
import {
  DESKTOP_WIDTH_SIZE_M,
  DESKTOP_WIDTH_SIZE_S,
  MOBILE_WIDTH_SIZE_L,
  MOBILE_WIDTH_SIZE_S,
} from '../../shared/themes/size';

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

interface ServerSideProps {
  appLibrary: App.AppLibrary.LibraryItem[];
}

interface AppJson {
  resourceId: string;
  result: App.AppLibrary.LibraryItem[];
}

export const Home: NextPage<ServerSideProps> = function (props) {
  const { appLibrary } = props;

  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <Wrapper>
          <TodaySummaryWidget />
          <AppLibrary apps={appLibrary} />
          <LibraryCapacities />
        </Wrapper>
      </ContentWrapper>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  async function () {
    const hostUrl = process.env.HOST_URL || 'http://localhost:3000';
    const res = await fetch(`${hostUrl}/data/apps.json`);
    const appJson = (await res.json()) as AppJson;

    return { props: { appLibrary: appJson.result } };
  };

export default Home;
