import { AppProps } from 'next/app';
import React from 'react';

import { DataWrapper } from '../screens/smu/contexts/DataContext';
import { ThemeContext } from '../shared/contexts/ThemeContext';
import { GlobalStyles } from '../theme';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeContext>
      <DataWrapper>
        <GlobalStyles />
        <Component {...pageProps} />
      </DataWrapper>
    </ThemeContext>
  );
};

export default App;
