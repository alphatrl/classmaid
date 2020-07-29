import React, { useEffect, useState } from 'react';
import './styles.scss';
import 'normalize.css';
import { List } from '../../components/';

export const Community: React.FC = () => {
  const [links, setLinks] = useState({
    telegram: [
      {
        title: '',
        link: '',
      },
    ],
    instagram: [
      {
        title: '',
        link: '',
      },
    ],
    websites: [
      {
        title: '',
        link: '',
      },
    ],
  });

  useEffect(() => {
    const load = async () => {
      const link = await fetch('resources/files/community.json').then((r) => {
        return r.json();
      });

      setLinks(link);
    };

    document.title = 'SMU Shortcuts | Community';
    load();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Community</h1>
      </header>

      <main className="mainView">
        <List title="Telegram" data={links.telegram} />
        <div className="paddingList" />
        <List title="Instagram" data={links.instagram} />
        <div className="paddingList" />
        <List title="Websites" data={links.websites} />
      </main>
    </div>
  );
};

export default Community;
