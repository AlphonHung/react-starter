export interface IRouterMap {
    path: string;
    component: React.FunctionComponent;
    exact?: boolean;
    auth?: boolean;
    noAuthRedirect?: string;
}