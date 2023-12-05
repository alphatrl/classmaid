import React from 'react';
import styled from 'styled-components';

import { useThemeProvider } from '../../contexts/ThemeContext';
import { MOBILE_MEDIA_QUERY } from '../../themes/size';
import NavHeader from '../navigation/NavHeader';
import SEO from '../SEO';

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

  @media screen and ${MOBILE_MEDIA_QUERY} {
    height: auto;
  }
`;

interface Props {
  title?: string;
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = function (
  props
) {
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
