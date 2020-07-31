import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from '../../containers/Home';
import Main from '../../containers/Main';
import Create from '../../containers/Create';
import Edit from '../../containers/Edit';
import About from '../../containers/About';
import Menu from './Menu';
import NotFound from './NotFound';

const Routing = () => (
  <div>
    <HashRouter>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/list" component={Main} exact />
        <Route path="/new" component={Create} exact />
        <Route path="/edit/:id" component={Edit} exact />
        <Route path="/about" component={About} exact />
        <Route component={NotFound} />
        <Redirect to="/home" />
      </Switch>
    </HashRouter>
  </div>
);

export default Routing;
