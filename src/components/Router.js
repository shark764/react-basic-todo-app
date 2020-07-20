import React from 'react';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from '../containers/Main';
import Create from '../containers/Create';
import Edit from '../containers/Edit';
import NotFound from './NotFound';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/home" component={Main} exact />
        <Route path="/new" component={Create} exact />
        <Route path="/edit/:id" component={Edit} exact />
        <Route component={NotFound} />
        <Redirect to="/home" />
      </Switch>
    </HashRouter>
  );
}

export default Router;
