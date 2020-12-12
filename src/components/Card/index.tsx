import React, { useEffect, useState, useRef, ReactChild } from 'react';
import styled from 'styled-components';

interface CardProps {
  children?: ReactChild;
  style?: Record<string, unknown>;
}

const CardContainer = styled.div`
  border: 3px solid #272727;
  box-sizing: border-box;
  width: 100%;
`;

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
    <CardContainer
      ref={containerRef}
      style={{ ...style, ...{ height: height } }}
    >
      {children}
    </CardContainer>
  );
}

export default Card;
