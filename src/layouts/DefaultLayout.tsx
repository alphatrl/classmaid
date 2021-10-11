import { useMediaQuery } from 'beautiful-react-hooks';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import wallpaper1 from '../../public/images/wallpapers/wallpaper-1.jpg';
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

const ImageWrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;

  filter: ${(props) => props.theme.background.gradient};
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
      <ImageWrapper>
        <Image
          src={wallpaper1}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          alt=""
        />
      </ImageWrapper>
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
