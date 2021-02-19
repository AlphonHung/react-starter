import { lazy } from 'react';
import { IRouterMap } from '~/domain';

export const NormalRoutes: IRouterMap[] = [
    {
        path: '/intro',
        component: lazy(() => import('~/views/IntroView')),
    },
    {
        path: '/login',
        component: lazy(() => import('~/views/LoginView')),
    },
];

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