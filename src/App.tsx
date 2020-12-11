import React from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Guides, Community, About } from './screens';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
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
        </Switch>
      </div>
    </BrowserRouter>
  );
};
