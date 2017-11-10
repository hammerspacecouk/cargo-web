// import * as Play from '../___to-move___/pages/Play';
// import * as Player from '../___to-move___/pages/Player';
//
// import NotFound from '../___to-move___/components/Error/NotFound';

import * as Home from '../Containers/Pages/Home';
import * as Ports from '../Containers/Pages/Ports';

import NotFound from '../Views/Components/Error/NotFound';
import StyleguideView from "../Views/Pages/Home/StyleguideView";

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
    {
        path: "/profile",
        component: Player.Profile,
        login: true,
        exact: true,
        cacheControl: cachePrivate,
    },
    //
    // play routes
    // {
    //     path: "/play",
    //     component: Play.Show,
    //     login: true,
    //     exact: true,
    //     cacheControl: cachePrivate,
    // },

    // todo - /play/ships - a list of your ships
    // {
    //     path: "/play/ships/:shipId",
    //     component: Play.Ship,
    //     login: true,
    //     exact: true,
    //     cacheControl: cachePrivate,
    // },
    //
    // {
    //     path: "/play/ships/:shipId/name",
    //     component: Play.ShipName,
    //     login: true,
    //     exact: true,
    //     cacheControl: cachePrivate,
    // },

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
    //
    // // general routes
    // {
    //     path: "/login",
    //     component: Home.Login,
    //     exact: true,
    //     cacheControl: cachePublic,
    // },
    {
        path: "/styleguide",
        component: StyleguideView,
        exact: true,
        cacheControl: cachePublic,
    },
    {
        path: "/",
        component: Home.Index,
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
