import React, { useEffect, useState } from 'react';
import './styles.scss';
import 'normalize.css';
import { CardList } from '../../components/';

export const Home: React.FC = () => {

  const [links, setLinks] = useState({
    school: [
      {
        title: '',
        logo: '',
        link: '',
        color: '',
        newTab: false,
      },
    ],
    others: [
      {
        title: '',
        logo: '',
        link: '',
        color: '',
        newTab: false,
      },
    ],
  });

  useEffect(() => {
    const load = async () => {
      const link = await fetch('resources/files/home.json').then((r) => {
        return r.json();
      });

      setLinks(link);
    };

    load();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>SMU Shortcuts</h1>
      </header>

      <main className="mainView">
        <CardList data={links.school} title={'School Links'} />
        <div className="paddingCard" />
        <CardList data={links.others} title={'More Resources'} />
      </main>
    </div>
  );
};

export default Home;
