import React from 'react';
import './styles.scss';
import 'normalize.css';
import { CardList } from '../../components/';
import { school_links, community_links } from '../../constants/links';

export const Home: React.FC = () => {
  return (
    <div>
      <header className="header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="mainView">
        <CardList data={school_links} title={'School Links'} />
        <div className="padding" />
        <CardList data={community_links} title={'Community Links'} />
      </main>
    </div>
  );
}

export default Home;
