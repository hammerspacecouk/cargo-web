import * as Home from './pages/Home';
import * as Play from './pages/Play';
import * as Player from './pages/Player';
import * as Ports from './pages/Ports';

import NotFound from './components/Error/NotFound';

export interface RouteItem {
    path?: string;
    component: any;
    exact?: boolean;
    cacheControl: string;
    login?: boolean;
}

const cachePrivate = 'private, no-cache';
const cachePublic = 'public, max-age=600';

const routes: RouteItem[] = [
    // play routes
    {
        path: "/profile",
        component: Player.Profile,
        login: true,
        exact: true,
        cacheControl: cachePrivate,
    },

    {
        path: "/play",
        component: Play.Show,
        login: true,
        exact: true,
        cacheControl: cachePrivate,
    },

    // todo - /play/ships - a list of your ships
    {
        path: "/play/ships/:shipId",
        component: Play.Ship,
        login: true,
        exact: true,
        cacheControl: cachePrivate,
    },

    // public data routes
    {
        path: "/ports",
        component: Ports.List,
        exact: true,
        cacheControl: cachePublic,
    },
    {
        path: "/ports/:portId",
        component: Ports.Show,
        exact: true,
        cacheControl: cachePublic,
    },

    // general routes
    {
        path: "/login",
        component: Home.Login,
        exact: true,
        cacheControl: cachePublic,
    },
    {
        path: "/styleguide",
        component: Home.Styleguide,
        exact: true,
        cacheControl: cachePublic,
    },
    {
        path: "/",
        component: Home.Home,
        exact: true,
        cacheControl: cachePublic,
    },

    // fall-through, 404 route
    {
        component: NotFound,
        cacheControl: cachePublic,
    }
];


export default routes;
