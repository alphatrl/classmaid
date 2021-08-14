import { isArray } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { AppLibrary, CapacityCard, TodayCard } from '../components/Card/';
import DefaultLayout from '../layouts/DefaultLayout';

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
  const router = useRouter();
  const path = router.asPath.match(/#([a-z0-9-]+)/gi);
  const isExportModal = isArray(path) && path[0] === '#boss-export';
  const isSchoolGuide = isArray(path) && path[0] === '#school-guide';
  const isAbout = isArray(path) && path[0] === '#about';
  const isAddHomeScreen = isArray(path) && path[0] === '#add-to-homescreen';

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
      {isSchoolGuide && <SchoolGuide />}
      {isAbout && <About />}
      {isAddHomeScreen && <AddHomeScreen />}
    </DefaultLayout>
  );
};

export default Home;
