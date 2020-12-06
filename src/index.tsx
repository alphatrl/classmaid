import * as _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import ReactGA from 'react-ga';

ReactGA.initialize(`${process.env.GA}`);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
