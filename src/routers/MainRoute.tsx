import React, { Component, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IRouterMap } from '~/domain';
import useAuth from '~/hooks/useAuth';
import { NormalRoutes, HeaderRoutes } from '~/routers/RouteConfig';
import HeaderNavigator from '~/components/HeaderNavigator';

/** 需要登入驗證的頁面 */
const PrivateRoute = (props: any) => {
    const { component, noAuthRedirect, ...rest } = props;
    const auth = useAuth.authorized();
    // 已登入：顯示原指定組件
    if (auth) return <Route component={component} />
    // 未登入：重新導向至指定頁或登入頁
    return (
        <Route render={() => <Redirect to={{ pathname: noAuthRedirect || "/login", state: { from: location } }} />} />
    )
}

/** 依照route的auth決定應使用的Route組件 */
const RenderRoute = (configs: IRouterMap[]) => configs.map((route, index) => {
    if (route.auth) return <PrivateRoute key={`route_${index}`} {...route} />;
    else return <Route key={`route_${index}`} path={route.path} component={route.component} />;
})

/** 最上層的router，定義主要功能頁面 */
const MainRoute = () => {
    const auth = useAuth.authorized();
    return (
        <Switch>
            {/** 整頁頁面組件 */}
            {RenderRoute(NormalRoutes)}
            {/** 共享組件頁面 */}
            <Route render={props => {
                return (
                    <React.Fragment>
                        <HeaderNavigator />
                        {RenderRoute(HeaderRoutes)}
                    </React.Fragment>
                )
            }} />
            {/* <Route exact path="/" render={() => {
                if (auth) return (<Redirect to="/home" />);
                return <IntroView />
            }} />
            <Route path="/login" component={LoginView} />
            <PrivateRoute path="/home">
                <HomeRoute />
            </PrivateRoute>
            <Route path="*" component={NoMatchView} /> */}
        </Switch>
    )
};

export default MainRoute;