import React, { useEffect, useState } from 'react';
import { Card } from '../index';

import './styles.scss';

interface CardProps {
  cardStyle?: Record<string, unknown>;
  title?: string;
  logo?: string;
  link?: string;
  newTab?: boolean;
}

const CardLink: React.FC<CardProps> = ({
  cardStyle,
  title,
  logo,
  link,
  newTab,
}: CardProps) => {
  const isNewTab = newTab ? '_blank' : '_self';

  return (
    <Card
      style={{
        ...cardStyle,
        ...{
          backgroundColor: '#0A0A0A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <a href={link} className="card-link" target={isNewTab}>
        <div className="card-container">
          <div className="image">
            <span className="material-icons-sharp md-48">{logo}</span>
          </div>
          <div className="title">{title}</div>
        </div>
      </a>
    </Card>
  );
};

CardLink.defaultProps = {
  title: '',
  logo: 'help_outline',
  link: 'smu.edu.sg',
  newTab: true,
};

export default CardLink;
