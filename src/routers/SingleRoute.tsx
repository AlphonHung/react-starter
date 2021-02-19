import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IRouterMap } from '~/domain';
import useAuth from '~/hooks/useAuth';

/** 單一Route，依據參數定義決定顯示組件或導頁 */
const SingleRoute = (props: IRouterMap) => {
    const authed = useAuth.authorized();
    // 需驗證且通過驗證 或 不需驗證且未通過驗證：顯示原指定組件
    if ((props.auth && authed) || (!props.auth && !authed)) return (<Route component={props.component} />);
    // 需驗證且未通過驗證，導向至指定頁或登入頁
    // 不需驗證且通過驗證，導向至指定頁或首頁
    return (<Route render={() => (
        <Redirect to={{
            pathname: props.auth ? (props.noAuthRedirect || "/login") : (props.authRedirect || "/"),
            state: { from: location }
        }} />
    )} />);
};

export default SingleRoute;