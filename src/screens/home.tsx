import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';

import { NavBar, Ticker } from '../components';
import logo from '../images/logo-nobg.png';

import './styles.scss';
import '../styles/home.scss';

export const Home: React.FC = () => {
  

  useEffect(() => {
    // ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <header className="header">
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>SMU Shortcuts</h1>
      </header>

    
      <NavBar />
      <Ticker />

      <div className="container">

        
        

      </div>
    </>
  );
};

export default Home;
