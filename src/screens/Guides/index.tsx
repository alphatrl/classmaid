import React from 'react';
import './styles.scss';
import 'normalize.css';
import { guides_link as links } from '../../constants/links';
import { List } from '../../components/';

export const Community: React.FC = () => {
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
}

export default Community;
