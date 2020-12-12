import React, { useEffect, useState, useRef, ReactChild } from 'react';

import './styles.scss';

interface CardProps {
  children?: ReactChild;
  style?: Record<string, unknown>;
}

const Card: React.FC<CardProps> = ({ children, style }: CardProps) => {
  const [height, setHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSquare = () => {
      const current = containerRef.current;
      setHeight((height) => (current ? current.offsetWidth : height));
    }
    updateSquare();
    window.addEventListener('resize', () => updateSquare());

    return () => window.removeEventListener('resize', () => updateSquare());
  }, []);

  return (
    <div
      className="box"
      ref={containerRef}
      style={{ ...style, ...{ height: height } }}
    >
      {children}
    </div>
  );
}

export default Card;
