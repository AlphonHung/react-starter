export interface IRouterMap {
    path: string; // 路由
    component: React.FunctionComponent; // 頁面組件
    exact?: boolean;
    auth?: boolean; // 登入驗證
    noAuthRedirect?: string; // 無驗證時重新導向
}