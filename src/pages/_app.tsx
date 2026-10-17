import '../styles/globals.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import React from 'react';

import { DataWrapper } from '../screens/smu/contexts/DataContext';
import { ContentWrapper } from '../shared/contexts/ContentContext';
import { ThemeWrapper } from '../shared/contexts/ThemeContext';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <ThemeWrapper>
      <ContentWrapper>
        <DataWrapper>
          <Component {...pageProps} />
          <Analytics />
        </DataWrapper>
      </ContentWrapper>
    </ThemeWrapper>
  );
};

export default App;
