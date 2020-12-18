import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import logo from '../images/logo-nobg.png';
import { NavBar } from '../components';

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px 0;

  .shortcutsLogo {
    width: 100px;
    image-rendering: -webkit-optimize-contrast;
  }

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
`;

const Container = styled.main`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 3px solid #2b2b2b;
  box-sizing: border-box;

  h3 {
    margin: 0;
  }

  p,
  li {
    font-weight: 500;
  }

  li {
    padding: 6px 0;
  }

  a {
    color: #2b2b2b;
  }

  a:hover {
    color: #946c14;
  }
`;

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'SMU Shortcuts | About';
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <Header>
        <img src={logo} className="shortcutsLogo" alt="smu-shortcut icon"></img>
        <h1>About</h1>
      </Header>
      <NavBar />

      <Container>
        <p>
          Providing students a quick one-click bookmarks to commonly used sites
          in SMU.
        </p>
        <p>Designed by SMU students for SMU students </p>
        <p>This site is non-affliated with SMU.</p>
      </Container>
      <Container>
        <h3>Contribute</h3>
        <p>Want to add more sites or offer suggestions?</p>
        <ul>
          <li>
            SMU Student? Make a suggestion&nbsp;
            <a href="https://bit.ly/30SRyIo">here</a>
          </li>
          <li>
            Developer? Add an issue or make a pull request on&nbsp;
            <a href="https://github.com/bottleneckco/smu-shortcuts">Github</a>
          </li>
        </ul>
      </Container>
    </>
  );
};

export default About;
