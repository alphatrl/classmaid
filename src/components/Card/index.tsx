import React from 'react';
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
        <div className="imageView">
          <span className="material-icons-round md-48">{logo}</span>
        </div>
        <div className="label">{title}</div>
      </div>
    </a>
  );
};

Card.defaultProps = {
  title: '',
  logo: 'help_outline',
  link: 'smu.edu.sg',
  color: 'red',
  newTab: false,
};

export default Card;
