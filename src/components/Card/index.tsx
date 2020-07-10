import React from 'react';
import { getIcon } from '../../constants/getIcon';
import './styles.scss';

interface CardProps {
  title?: string;
  logo?: string;
  link?: string;
  color?: string;
}

const Card: React.FC<CardProps> = ({ title, logo, link, color }: CardProps) => {
  return (
    <a href={link} className="cardLink">
      <div className="card" style={{ backgroundColor: color }}>
        <div className="imageView">{getIcon(logo)}</div>
        <div className="label">{title}</div>
      </div>
    </a>
  );
};

Card.defaultProps = {
  title: '',
  logo: '',
  link: 'smu.edu.sg',
  color: 'red',
};

export default Card;
