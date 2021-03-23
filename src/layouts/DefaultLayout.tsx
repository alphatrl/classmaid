import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SEO from '../components/SEO';

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 24px;

  @media (max-width: 1400px) {
    width: 80%;
  }

  @media (max-width: 720px) {
    width: 90%;
  }

  @media (max-width: 350px) {
    width: 95%;
  }
`;

interface Props {
  title?: string;
}

const DefaultLayout: React.FC<Props> = function (props) {
  const { title = 'SMU Shortcuts', children } = props;

  return (
    <Wrapper>
      <Header title={title} />
      <NavBar />
      <SEO title={title} />
      <main>{children}</main>
    </Wrapper>
  );
};

export default DefaultLayout;
