import * as Home from './pages/Home';
import * as Player from './pages/Player';
import * as Ports from './pages/Ports';

import NotFound from './components/Error/NotFound';

export interface RouteConfig {
    path?: string;
    component: any,
    exact?: boolean
}

const routes: RouteConfig[] = [
    {
        path: "/ports",
        component: Ports.List,
        exact: true,
    },
    {
        path: "/ports/:portId",
        component: Ports.Show,
        exact: true,
    },

    {
        path: "/profile",
        component: Player.Profile,
        exact: true,
    },

    {
        path: "/login",
        component: Home.Login,
        exact: true,
    },
    {
        path: "/",
        component: Home.Home,
        exact: true,
    },
    {
        component: NotFound
    },
];

export default routes;
