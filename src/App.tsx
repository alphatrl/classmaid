import React from 'react';
import './App.scss';
import { CardList } from './components/CardList';
import { school_links } from './constants/links';

export const App: React.FC = () => {

  return (
    <div className="App">
      <header className="header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="schoolNav">
        <CardList data={school_links} title={'School Links'} />
      </main>
    </div>
  );
}