import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { HeaderRoutes } from '~/routers/RouteConfig';
import HomeHeader from '~/components/HomeHeader';
import SingleRoute from '~/routers/SingleRoute';

/** 登入後，共享Header組件頁面 */
const HeaderRoute = () => (
    <Route render={props => {
        return (
            <React.Fragment>
                <HomeHeader />
                <Suspense fallback={<div>Second loading...</div>}>
                    <Switch>
                        {HeaderRoutes.map((route, index) => (<SingleRoute key={`header_route_${index}`} {...route} />))}
                    </Switch>
                </Suspense>
            </React.Fragment>
        )
    }} />
)

export default HeaderRoute;