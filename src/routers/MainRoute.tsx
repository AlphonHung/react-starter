import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// pages
import IntroView from '~/views/IntroView';
import LoginView from '~/views/LoginView';
// import HomeView from '~/views/HomeView';
import HomeRoute from '~/routers/HomeRoute';
import NoMatchView from '~/views/NoMatchView';
// hooks
import useAuth from '~/hooks/useAuth';
import TodoView from '~/views/TodoView';

/** 需要登入驗證的頁面 */
const PrivateRoute = (props: { path: string, children: React.ReactNode }) => {
    const auth = useAuth.authorized();
    return (
        <Route render={renderProps => auth
            ? (props.children)
            : (<Redirect to={{ pathname: "/login", state: { from: location } }} />)} />
    )
}

/** 最上層的router，定義主要功能頁面 */
const MainRoute = () => {
    const auth = useAuth.authorized();
    return (
        <Switch>
            <Route exact path="/" render={() => {
                if (auth) return (<Redirect to="/home" />);
                return <IntroView />
            }} />
            <Route path="/login" component={LoginView} />
            <PrivateRoute path="/home">
                <HomeRoute />
            </PrivateRoute>
            <Route path="*" component={NoMatchView} />
        </Switch>
    )
};

export default MainRoute;