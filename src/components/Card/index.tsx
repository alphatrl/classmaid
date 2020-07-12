import React from 'react';
import { getIcon } from '../../constants/getIcon';
import './styles.scss';
import '../../constants/colors.scss';

interface CardProps {
  title?: string;
  logo?: string;
  link?: string;
  color?: string;
  newTab?: boolean;
}

const Card: React.FC<CardProps> = ({ title, logo, link, color, newTab }: CardProps) => {
  const isNewTab = newTab ? '_blank' : '_self';
  const className = 'card ' + color;

  return (
    <a href={link} className="cardLink" target={isNewTab}>
      <div className={className}>
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
  newTab: false,
};

export default Card;
