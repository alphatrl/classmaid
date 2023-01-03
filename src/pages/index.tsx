import React from 'react';
import styled from 'styled-components';

import DefaultLayout from '../layouts/DefaultLayout';

const ContentWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1050px;
  display: flex;
  flex-wrap: wrap;

  padding-top: 40px;
  padding-bottom: 64px;

  @media screen and (max-width: 1100px) {
    width: 900px;
  }

  @media screen and (max-width: 1000px) {
    width: 800px;
  }
`;

export const Home: React.FC = function () {
  return (
    <DefaultLayout title="SMU">
      <ContentWrapper>
        <Wrapper></Wrapper>
      </ContentWrapper>
    </DefaultLayout>
  );
};

export default Home;
