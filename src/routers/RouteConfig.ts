import { lazy } from 'react';
import { IRouterMap } from '~/domain';
import IntroView from '~/views/IntroView';
import LoginView from '~/views/LoginView';

// 所有路由一覽

/** 未登入可造訪的頁面 */
export const UnAuthRoutes: IRouterMap[] = [
    {
        path: '/intro',
        component: IntroView,
        authRedirect: '/',
    },
    {
        path: '/login',
        component: LoginView,
        authRedirect: '/',
    },
];

/** 登入後有共享header的頁面 */
export const HeaderRoutes: IRouterMap[] = [
    {
        path: '/',
        component: lazy(() => import('~/views/HomeView')),
        exact: true,
        auth: true,
        noAuthRedirect: '/intro',
    },
    {
        path: '/todo',
        component: lazy(() => import('~/views/TodoView')),
        auth: true,
    },
];