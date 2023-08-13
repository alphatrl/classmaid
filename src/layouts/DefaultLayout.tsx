import React from 'react';
import styled from 'styled-components';

import NavHeader from '../components/navigation/NavHeader';
import SEO from '../components/SEO';
import { useThemeProvider } from '../contexts/ThemeContext';

// const Header = dynamic(() => import('../components/Header'));

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
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
  children?: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = function (props) {
  const { title = 'Classmaid', children } = props;
  const { componentMounted } = useThemeProvider();

  if (!componentMounted) {
    return <div />;
  }

  return (
    <Wrapper>
      <SEO title={title} />

      <main>
        <NavHeader />
        {children}
      </main>
    </Wrapper>
  );
};

export default DefaultLayout;
