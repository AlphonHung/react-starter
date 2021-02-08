import React from 'react';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';
// pages
import HomeView from '../views/HomeView';
import TodoView from '~/views/TodoView';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/todo" component={TodoView} />
    </Switch>
);

export default Routes;