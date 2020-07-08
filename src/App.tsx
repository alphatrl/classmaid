import React from 'react';
import './App.scss';
import { CardList } from './components/CardList';

export const App: React.FC = () => {
  const data = [
    {
      title: 'eLearn',
      logo: 'book',
      link: 'https://google.com',
      color: 'red',
    },
    {
      title: 'Oasis',
      logo: 'umbrella',
      link: 'http://google.com',
      color: 'blue',
    },
    {
      title: 'BOSS',
      logo: 'wallet',
      link: 'http://google.com',
      color: 'gray',
    },
  ];
  return (
    <div className="App">

      <header className="Header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="SchoolNav">
        <h2>School Links</h2>
        <CardList data={data} />
      </main>
    </div>
  );
}