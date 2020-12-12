import React, { useEffect, useState } from 'react';
import { Card } from '../index';
import styled from 'styled-components';

interface CardProps {
  cardStyle?: Record<string, unknown>;
  gridArea: string;
  title?: string;
  logo?: string;
  link?: string;
  newTab?: boolean;
}

const Link = styled.a`
  text-decoration: none;
  height: 90%;
  width: 90%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  color: #ffffff;
  transition: 5ms;

  &:hover {
    color: #2b2b2b;
  }
`;

const Image = styled.div`
  height: 55%;
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
`;

const Icon = styled.span`
  font-size: 6vw;

  @media screen and (max-width: 720px) {
    font-size: 20vw;
  }
`;

const Title = styled.span`
  height: 45%;
  display: flex;
  flex-direction: column-reverse;
  font-weight: 600;
  font-size: 2vw;

  @media screen and (max-width: 720px) {
    font-size: 7vw;
  }
`;

const CardLink: React.FC<CardProps> = (props) => {
  const { cardStyle, title, logo, link, newTab, gridArea } = props;
  const isNewTab = newTab ? '_blank' : '_self';

  return (
    <Card gridArea={gridArea}>
      <Link href={link} className="card-link" target={isNewTab}>
        <Container>
          <Image>
            <Icon className="material-icons-sharp md-48">{logo}</Icon>
          </Image>
          <Title>{title}</Title>
        </Container>
      </Link>
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
