import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useDataContext } from '../../../contexts/DataContext';
import { Tab } from '../../Modal/styled';
import { CardTemplate } from '../styled';
import Section from './components/Section';

const Wrapper = styled(CardTemplate)`
  overflow-y: auto;
  min-height: 400px;
  height: fit-content;

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    margin-top: 16px;
    overflow-y: unset;
    min-height: 200px;
  }
`;

const TabsStyled = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const TabsWrapper = styled.div`
  display: flex;
  margin-right: 16px;
  overflow: auto;
  box-sizing: content-box;

  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    margin-right: 24px;
  }
`;

const CustomTab = styled(Tab)`
  font-size: 1.15em;
  font-weight: 500;
  border-radius: 20px;
  margin: 0;
  display: flex;
  margin-right: 24px;
  white-space: nowrap;
  align-items: center;
  height: 24px;
`;

const AppLibrary: React.FC = () => {
  const { appLibrary } = useDataContext();
  const [tabActive, setTabActive] = useState<string | null>(null);

  const handleTabClick = useCallback((key: string) => {
    setTabActive(key);
  }, []);

  const titleList = useMemo(() => {
    const titles = appLibrary.map((app) => ({
      uid: app.uid,
      title: app.title,
    }));

    if (titles.length > 0) {
      setTabActive(titles[0].uid);
    }

    return titles;
  }, [appLibrary]);

  const currentLibrary = useMemo(() => {
    if (!tabActive) {
      return null;
    }

    return appLibrary.find((library) => tabActive === library.uid);
  }, [appLibrary, tabActive]);

  return (
    <Wrapper>
      <TabsStyled>
        <TabsWrapper>
          {titleList.map((title) => (
            <CustomTab
              key={title.uid}
              role="button"
              isActive={tabActive === title.uid}
              onClick={() => handleTabClick(title.uid)}
            >
              {title.title}
            </CustomTab>
          ))}
        </TabsWrapper>
      </TabsStyled>
      {currentLibrary && (
        <Section
          key={currentLibrary.uid}
          shortcuts={currentLibrary.shortcuts}
        />
      )}
    </Wrapper>
  );
};

export default AppLibrary;
