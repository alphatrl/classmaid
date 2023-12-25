import Link from 'next/link';
import { useRouter } from 'next/router';
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
  backdrop-filter: blur(12px) saturate(86%);

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  z-index: 10;
`;

const CustomLink = styled(Link)`
  text-decoration: unset;
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2em;
  padding: 4px 0;
`;

const NavBar: React.FC = function () {
  const { pathname } = useRouter();

  // NOTE: (amos@taskade.com) Capture the first part of the path "/X" in "/X/Y"
  const match = pathname.match(/\/[^/]+/);
  const redirectUrl = match?.[0] ?? '/';

  return (
    <Wrapper>
      <CustomLink href={redirectUrl}>
        <Title>Classmaid</Title>
      </CustomLink>
      <MoreButton />
    </Wrapper>
  );
};

export default NavBar;
