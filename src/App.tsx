import React from 'react';
import './App.scss';
import 'normalize.css';
import { CardList } from './components/CardList';
import { Footer } from './components/Footer';
import { school_links, community_links } from './constants/links';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="mainView">
        <CardList data={school_links} title={'School Links'} />
        <div className="padding" />
        <CardList data={community_links} title={'Community Links'} />
      </main>

      <Footer />
    </div>
  );
}