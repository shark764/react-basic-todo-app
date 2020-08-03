import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import NotFound from './NotFound';
import Home from '../../containers/Home';
import ArticleList from '../../containers/ArticleList';
import TodoList from '../../containers/TodoList';
import About from '../../containers/About';
import FormWithReusableComponents from '../../containers/Form';
import ReferenceUsage from '../../containers/ReferenceUsage';
import Menu from './Menu';

const Routing = () => (
  <div>
    <HashRouter>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/articles" component={ArticleList} exact />
        <Route path="/todos/:id?" component={TodoList} exact />
        <Route path="/form/" component={FormWithReusableComponents} exact />
        <Route path="/ref/" component={ReferenceUsage} exact />
        <Route path="/about" component={About} exact />
        <Route component={NotFound} />
        <Redirect to="/home" />
      </Switch>
    </HashRouter>
  </div>
);

export default Routing;
