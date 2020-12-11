import React, { useEffect, useState } from 'react';
import './styles.scss';
import { List } from '../components';

export const Community: React.FC = () => {
  const [links, setLinks] = useState({
    intro: [
      {
        title: '',
        link: '',
      },
    ],
  });

  useEffect(() => {
    const load = async () => {
      const link = await fetch(`${process.env.SERVER_URL}/guides.json`).then((r) => {
          return r.json();
        }
      );
      setLinks(link);
    };

    document.title = 'SMU Shortcuts | Guides';
    load();
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Guides</h1>
      </header>

      <main className="mainView">
        <List title="Intro" data={links.intro} />
      </main>
    </div>
  );
};

export default Community;
