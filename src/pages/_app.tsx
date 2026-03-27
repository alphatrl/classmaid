import '../styles/globals.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import React from 'react';

import { DataWrapper } from '../screens/smu/contexts/DataContext';

const App: React.FC<AppProps> = function (props) {
  const { Component, pageProps } = props;

  return (
    <DataWrapper>
      <Component {...pageProps} />
      <Analytics />
    </DataWrapper>
  );
};

export default App;
