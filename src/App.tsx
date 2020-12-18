import React from 'react';
import styled from 'styled-components';
import './App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Guides, Community, About, Calendar } from './screens';

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

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/guides">
            <Guides />
          </Route>
          <Route exact path="/community">
            <Community />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};
