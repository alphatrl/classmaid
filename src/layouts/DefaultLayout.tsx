import { useMediaQuery } from 'beautiful-react-hooks';
import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ModalOverlay } from '../components/Modal/styled';
import NavBar from '../components/Navigation';
import SEO from '../components/SEO';
import { useDarkMode } from '../contexts/ThemeContext';

const Header = dynamic(() => import('../components/Header'));

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    height: auto;
  }
`;

interface Props {
  title?: string;
}

const DefaultLayout: React.FC<Props> = function (props) {
  const { title = 'SMU Shortcuts', children } = props;
  const [showNav, setShowNav] = useState(false);
  const isMobile = useMediaQuery('screen and (max-width: 820px)');
  const { componentMounted } = useDarkMode();

  useEffect(() => {
    if (isMobile) {
      setShowNav(false);
    }
  }, [isMobile]);

  const handleShowNavBar = useCallback(() => {
    if (!isMobile) {
      return;
    }
    setShowNav(true);
  }, [isMobile]);

  const handleHideNavBar = useCallback(() => {
    if (!isMobile) {
      return;
    }
    setShowNav(false);
  }, [isMobile]);

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Wrapper>
      <SEO title={title} />
      {!isMobile ? (
        <NavBar hideNavigation={handleHideNavBar} />
      ) : (
        showNav && <NavBar hideNavigation={handleHideNavBar} />
      )}
      <main>
        {isMobile && <Header title={title} showNavigation={handleShowNavBar} />}
        {children}
      </main>
      {isMobile && showNav && <ModalOverlay onClick={handleHideNavBar} />}
    </Wrapper>
  );
};

export default DefaultLayout;
