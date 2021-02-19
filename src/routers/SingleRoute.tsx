import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRouterMap } from '~/domain';
import { RootState } from '~/store';

/** 單一Route，依據參數定義決定顯示組件或導頁 */
const SingleRoute = (props: IRouterMap) => {
    const authData = useSelector((state: RootState) => state.auth.authData);
    // 需驗證且通過驗證 或 不需驗證且未通過驗證：顯示原指定組件
    if ((props.auth && authData) || (!props.auth && !authData)) return (<Route component={props.component} />);
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