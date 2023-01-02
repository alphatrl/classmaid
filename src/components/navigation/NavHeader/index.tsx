import React from 'react';
import styled from 'styled-components';

import MoreButton from './components/MoreButton';

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  padding-left: max(24px, env(safe-area-inset-top));
  padding-right: max(12px, env(safe-area-inset-bottom));
  box-sizing: border-box;
  background: #0000008f;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.5em;
`;

const NavBar: React.FC = function () {
  return (
    <Wrapper>
      <Title>Classmaid</Title>
      <MoreButton />
    </Wrapper>
  );
};

export default NavBar;
