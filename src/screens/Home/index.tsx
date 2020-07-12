import React from 'react';
import './styles.scss';
import 'normalize.css';
import { CardList } from '../../components/';
import { home_links as links } from '../../constants/links';

export const Home: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="mainView">
        <CardList data={links.school} title={'School Links'} />
        <div className="paddingCard" />
        <CardList data={links.community} title={'More Resources'} />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
