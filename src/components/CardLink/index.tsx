import React, { useEffect, useState } from 'react';
import { Card } from '../index';

import './styles.scss';

interface CardProps {
  cardStyle?: Record<string, unknown>;
}

const CardLink: React.FC<CardProps> = ({ cardStyle }: CardProps) => {
  
  
  return (
    <Card>
      <></>
    </Card>
  );
};

export default CardLink;
