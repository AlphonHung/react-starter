import React from 'react';
import { Switch } from 'react-router-dom';
import { UnAuthRoutes } from '~/routers/RouteConfig';
import HeaderRoute from '~/routers/HeaderRoute';
import SingleRoute from '~/routers/SingleRoute';

/** 最上層的router，統合所有路由 */
const MainRoute = () => (
    <Switch>
        {/** 未登入的頁面 */}
        {UnAuthRoutes.map((route, index) => (<SingleRoute key={`normal_route_${index}`} {...route} />))}
        <HeaderRoute />
    </Switch>
);

export default MainRoute;