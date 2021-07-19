import { isArray } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { AppLibrary, CapacityCard, TodayCard } from '../components/Card/';
import DefaultLayout from '../layouts/DefaultLayout';
import firebase from '../utils/firebase';

const About = dynamic(() => import('../components/Modal/Home/About'));
const AddHomeScreen = dynamic(
  () => import('../components/Modal/Home/AddHomeScreen')
);
const BOSSTimetable = dynamic(
  () => import('../components/Modal/BOSSTimetable')
);
const SchoolGuide = dynamic(
  () => import('../components/Modal/Home/SchoolGuide')
);
const WelcomeGuide = dynamic(
  () => import('../components/Modal/Home/WelcomeGuide')
);

const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 64px);
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    padding: 8px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 56px);
  }
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home: React.FC = () => {
  const router = useRouter();
  const path = router.asPath.match(/#([a-z0-9-]+)/gi);
  const isExportModal = isArray(path) && path[0] === '#boss-export';
  const isWelcomeGuide = isArray(path) && path[0] === '#welcome-guide';
  const isSchoolGuide = isArray(path) && path[0] === '#school-guide';
  const isAbout = isArray(path) && path[0] === '#about';
  const isAddHomeScreen = isArray(path) && path[0] === '#add-to-homescreen';

  useEffect(() => {
    firebase?.analytics().logEvent('Home');
  }, []);

  return (
    <DefaultLayout title="Home">
      <Wrapper>
        <WidgetContainer>
          <TodayCard />
          <CapacityCard />
        </WidgetContainer>
        <AppLibrary />
      </Wrapper>
      {isExportModal && <BOSSTimetable />}
      {isWelcomeGuide && <WelcomeGuide />}
      {isSchoolGuide && <SchoolGuide />}
      {isAbout && <About />}
      {isAddHomeScreen && <AddHomeScreen />}
    </DefaultLayout>
  );
};

export default Home;
