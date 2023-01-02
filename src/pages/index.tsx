// import { isArray } from 'lodash';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { AppLibrary, CapacityCard, TodayCard } from '../components/Card/';
import DefaultLayout from '../layouts/DefaultLayout';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;

  padding-top: 24px;
  padding-bottom: max(24px, env(safe-area-inset-bottom));
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    padding-top: 16px;
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    padding-left: max(8px, env(safe-area-inset-left));
    padding-right: max(8px, env(safe-area-inset-right));
  }
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home: React.FC = () => {
  return (
    <DefaultLayout title="Home">
      <Wrapper>
        <WidgetContainer>
          <TodayCard />
          <CapacityCard />
        </WidgetContainer>
        <AppLibrary />
      </Wrapper>
    </DefaultLayout>
  );
};

export default Home;
