import { AppProps } from 'next/app';
import React from 'react';

import { DataWrapper } from '../contexts/DataContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { GlobalStyle } from '../theme';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeContext>
      <DataWrapper>
        <GlobalStyle />
        <Component {...pageProps} />
      </DataWrapper>
    </ThemeContext>
  );
};

export default App;
