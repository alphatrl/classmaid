import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { Modal } from '../../styled';
import { ModalOverlay, Tab } from '../../styled';
import { AVAILABLE_TABS, SchoolSurvival, WelcomeGuide } from './components';
import SoftwareGuide from './components/SoftwareGuide';

const Wrapper = styled.div`
  ul {
    margin: 0;
    padding: 0 24px;
  }

  li {
    padding: 4px 0;
  }

  a {
    color: ${(props) => props.theme.primary.blue};
    font-weight: 600;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    font-size: 1.05em;
    li {
      padding: 6px 0;
    }
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  margin-bottom: 1em;
`;

const ModalTemplate = styled(Modal)`
  min-height: 50%;
  max-height: 50%;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    max-height: 80%;
  }
`;

const StudyGuide: React.FC = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState('daily');

  const closeModal = () => {
    router.replace('/');
  };

  const handlePress = useCallback((key: string) => {
    setTabActive(key);
  }, []);

  const renderTabs = useCallback(() => {
    const tabKeys = Object.keys(AVAILABLE_TABS);
    return tabKeys.map((tabKey) => (
      <Tab
        key={tabKey}
        role="button"
        isActive={tabActive === tabKey}
        onClick={() => handlePress(tabKey)}
      >
        {AVAILABLE_TABS[tabKey]}
      </Tab>
    ));
  }, [handlePress, tabActive]);

  const currentTab = useMemo(() => {
    switch (tabActive) {
      case 'software':
        return <SoftwareGuide />;
      case 'welcome':
        return <WelcomeGuide />;
      default:
        return <SchoolSurvival />;
    }
  }, [tabActive]);

  return (
    <>
      <ModalTemplate title="School Guides">
        <h1>School Guides</h1>
        <TabsWrapper>{renderTabs()}</TabsWrapper>
        <Wrapper>{currentTab}</Wrapper>
      </ModalTemplate>
      <ModalOverlay onClick={closeModal} />
    </>
  );
};

export default StudyGuide;
