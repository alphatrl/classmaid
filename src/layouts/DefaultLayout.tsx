import React from 'react';
import styled from 'styled-components';

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

const DefaultLayout: React.FC = function (props) {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default DefaultLayout;
