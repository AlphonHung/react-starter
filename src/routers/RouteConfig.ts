import { IRouterMap } from '~/domain';
import HomeView from '~/views/HomeView';
import TodoView from '~/views/TodoView';
import IntroView from '~/views/IntroView';
import LoginView from '~/views/LoginView';
// import AsyncComponent from '~/components/AsyncComponent';

// const _import_views = (file: string) => AsyncComponent(() => import(file));

export const NormalRoutes: IRouterMap[] = [
    {
        path: '/intro',
        component: IntroView,
    },
    {
        path: '/login',
        component: LoginView,
    },
];

export const HeaderRoutes: IRouterMap[] = [
    {
        path: '/',
        component: HomeView,
        exact: true,
        auth: true,
        noAuthRedirect: '/intro',
    },
    {
        path: '/todo',
        component: TodoView,
        auth: true,
    },
];