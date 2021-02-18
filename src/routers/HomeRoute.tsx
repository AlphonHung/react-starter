import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
// pages
import HomeView from '~/views/HomeView';
import TodoView from '~/views/TodoView';
import HomeHeader from '~/components/HomeHeader';

const HomeRoute = () => {
    let { path, url } = useRouteMatch();

    return (
        <div>
            <HomeHeader />
            <Switch>
                <Route exact path="/home" component={HomeView} />
                <Route path={`/todo`} component={TodoView} />
            </Switch>
        </div>
    )
};

export default HomeRoute;