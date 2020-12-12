import React, { useEffect, useState, useRef, ReactChild } from 'react';
import styled from 'styled-components';

interface CardProps {
  children?: ReactChild;
  style?: Record<string, unknown>;
  gridArea: string;
  isSmall?: boolean;
}

interface CardContainerProps {
  height: number;
  gridArea: string;
}

const CardContainer = styled.div<CardContainerProps>`
  border: 3px solid #2b2b2b;
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.height}px;
  grid-area: ${(props) => props.gridArea};
`;

const SmallCard = styled(CardContainer)`
  background-color: #2b2b2b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 5ms;

  &:hover {
    border: 3px solid #e4a925;
    background-color: #e4a925;
  }
`;

const Card: React.FC<CardProps> = (props) => {
  const { children, style, gridArea, isSmall } = props;
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

  return isSmall ? (
    <SmallCard ref={containerRef} height={height} gridArea={gridArea}>
      {children}
    </SmallCard>
  ) : (
    <CardContainer ref={containerRef} height={height} gridArea={gridArea} >
      {children}
    </CardContainer>
  );
};

Card.defaultProps = {
  isSmall: true,
}

export default Card;
