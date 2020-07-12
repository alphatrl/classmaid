import React from 'react';
import './styles.scss';
import 'normalize.css';
// import { CardList } from '../../components/';

export const About: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1>About</h1>
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
            <a href="">Github</a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default About;
