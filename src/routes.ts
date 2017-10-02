import Home from './pages/Home/Home';
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
        path: "/",
        component: Home,
        exact: true,
    },
    {
        component: NotFound
    },
];

export default routes;
