import React from 'react';
import { useEffect, useState } from 'react';
import { Card } from '../Card';
import './styles.scss';

interface CardListProps {
  data: {
    title: string;
    logo: string;
    link: string;
    color: string;
  }[];
}

export const CardList: React.FC<CardListProps> = ({ data }: CardListProps) => {
  // const [data, setData] = useState(null);

  return (
    <div className="cardList">
      {data.map((entry, index) => {
        return (
          <div key={index} className="card">
            <Card
              title={entry.title}
              logo={entry.logo}
              link={entry.link}
              color={entry.color}
            />
          </div>
        );
      })}
    </div>
  );
};

CardList.defaultProps = {
  data: [
    {
      title: 'eLearn',
      logo: 'book',
      link: 'google.com',
      color: 'red',
    },
    // {
    //   title: 'Oasis',
    //   logo: 'umbrella',
    //   link: 'google.com',
    //   color: 'blue',
    // },
    // {
    //   title: 'BOSS',
    //   logo: 'wallet',
    //   link: 'google.com',
    //   color: 'blue-green',
    // },
  ],
};
