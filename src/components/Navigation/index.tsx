import React from 'react';
import styled from 'styled-components';

import AppNav from './components/AppNav';
import Settings from './components/Settings';

const Wrapper = styled.div`
  width: 80px;
  padding-top: max(24px, env(safe-area-inset-top));
  padding-bottom: max(24px, env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: ${(props) => props.theme.blur.backgroundBackwards};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @supports (backdrop-filter: ${(props) => props.theme.blur.blur}) {
    background: ${(props) => props.theme.blur.background};
    backdrop-filter: ${(props) => props.theme.blur.blur};
  }

  @media screen and (max-width: ${(props) => props.theme.mobileSize}) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    height: 100%;
    width: calc(92px + env(safe-area-inset-left));
    padding-left: env(safe-area-inset-left);
  }
`;

interface Props {
  hideNavigation?: () => void;
}

const NavBar: React.FC<Props> = (props) => {
  const { hideNavigation } = props;

  return (
    <Wrapper>
      <AppNav hideNavigation={hideNavigation} />
      <Settings hideNavigation={hideNavigation} />
    </Wrapper>
  );
};

export default NavBar;
