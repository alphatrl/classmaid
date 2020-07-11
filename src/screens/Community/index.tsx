import React from 'react';
import './styles.scss';
import 'normalize.css';
import { community_links as links } from '../../constants/links';
import { List } from '../../components/';

export const Community: React.FC = () => {
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
}

export default Community;
