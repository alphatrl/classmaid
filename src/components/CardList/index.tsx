import React from 'react';
import { Card } from '../';
// import { getButtonColor } from '../../constants/colors';

import './styles.scss';

interface CardListProps {
  title?: string;
  data: {
    title: string;
    logo: string;
    link: string;
    color: string;
    newTab: boolean;
  }[];
}

const CardList: React.FC<CardListProps> = ({ title, data }: CardListProps) => {
  const header = !title ? undefined : (
    <div className="cardListHeader">{title}</div>
  );

  return (
    <div className="cardList">
      {header}

      <div className="cardListView">
        {data.map((entry, index) => {
          return (
            <div key={index} className="cardView">
              <Card
                title={entry.title}
                logo={entry.logo}
                link={entry.link}
                color={entry.color}
                newTab={entry.newTab}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardList;
