import React from 'react';
import styled from 'styled-components';

import MoreButton from './components/MoreButton';

const Wrapper = styled.div`
  width: 100%;
  min-height: 64px;
  padding-top: max(8px, env(safe-area-inset-top));
  padding-bottom: 8px;
  padding-left: max(16px, env(safe-area-inset-left));
  padding-right: max(16px, env(safe-area-inset-right));
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
  font-size: 1.2em;
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
