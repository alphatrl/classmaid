import React from 'react';
import { Card } from '../Card';
import { getButtonColor } from '../../constants/colors';

import './styles.scss';

interface CardListProps {
  title?: string;
  data: {
    title: string;
    logo: string;
    link: string;
    color: string;
  }[];
}

export const CardList: React.FC<CardListProps> = ({ title, data }: CardListProps) => {
  const header = !title ? undefined : <div className="header">{title}</div>;

  return (
    <div className="cardList">
      {header}

      <div className="list">
        {data.map((entry, index) => {
          return (
            <div key={index} className="cardView">
              <Card
                title={entry.title}
                logo={entry.logo}
                link={entry.link}
                color={getButtonColor(entry.color)}
              />
            </div>
          );
        })}
      </div>
      {/* <div className="empty" /> */}
    </div>
  );
};
