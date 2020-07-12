import React, { useEffect } from 'react';
import './styles.scss';
import 'normalize.css';
// import { CardList } from '../../components/';

export const About: React.FC = () => {
  useEffect(() => {
    document.title = 'SMU Shortcuts | About';
  }, []);

  return (
    <div>
      <header className="header">
        <h1>
          About
          <img
            src="logo192.png"
            className="shortcutsLogo"
            alt="shortcut-logo"
          />
        </h1>
      </header>

      <main className="mainView">
        <p>
          Providing students a quick one-click bookmarks to commonly used sites
          in SMU.
        </p>
        <p> Designed by SMU students for SMU students </p>
        <p>This site is non-affliated with SMU.</p>

        <div className="contribute">
          <div className="aboutHeader">Contribute</div>
          <p>
            Want to suggest more sites? Add an issue or make a pull request
            on&nbsp;
            <a href="https://github.com/bottleneckco/smu-shortcuts">Github</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
