import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { NavBar, Ticker } from '../components';
import logo from '../images/logo-nobg.png';

import './styles.scss';
import '../styles/home.scss';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { string } from 'prop-types';



export const Home: React.FC = () => {
  

  useEffect(() => {
    // ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div>
      <header className="header">
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>SMU Shortcuts</h1>
      </header>

      <NavBar />
      <Ticker />
      

      <main className="mainView">
        
      </main>
    </div>
  );
};

export default Home;
