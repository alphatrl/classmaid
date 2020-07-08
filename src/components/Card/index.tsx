import React from 'react';
import { getIcon } from '../../helpers/getIcon';
import './styles.scss';

interface CardProps {
  title?: string;
  logo?: string;
  link?: string;
  color?: string;
}

export const Card: React.FC<CardProps> = ({ title, logo, link, color }: CardProps) => {
  return (
    <a href={link} className="card" style={{ backgroundColor: color }}>
      <div className="imageView">{getIcon(logo)}</div>
      <div className="label">{title}</div>
    </a>
  );
};

Card.defaultProps = {
  title: '',
  logo: 'book',
  link: 'smu.edu.sg',
  color: 'red',
};
