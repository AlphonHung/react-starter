import React from 'react';
import { Switch, Route, Link, HashRouter } from 'react-router-dom';
// pages
import Main from '../pages/Main';
import TodoListSet from '~/components/TodoList/TodoList';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={() => <Main title="Test Yooo" />} />
        <Route exact path="/fake" component={() => <Main title="Fake home" />} />
        <Route path="/todo" component={TodoListSet} />
    </Switch>
);

export default Routes;