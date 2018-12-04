import * as About from "./server/About";
import * as Home from "./server/Home";
import * as Login from "./server/Login";
import * as Play from "./server/Play";
import * as Profile from "./server/Profile";
import * as Ports from "./server/Ports";
import { RouteProps } from "react-router";
import { Environment } from "./util/Environment";

export enum CacheType {
  None = "no-cache, no-store",
  Private = "private",
  Public = "public"
}

export interface RouteItem extends RouteProps {
  cacheType?: CacheType;
  maxAge?: number;
}

const routes = {
  getAbout: () => "/about",
  getAboutCheating: () => "/about/cheating",
  getAboutDuplicate: () => "/about/duplicate",
  getAboutPolicies: () => "/about/policies",
  getAboutStatus: () => "/about/status",
  getLogin: () => "/login",
  getLoginAnonymous: () => `${Environment.apiHostname}/login/anonymous`,
  getLoginEmail: () => "/login/email",
  getLogout: () => `${Environment.apiHostname}/logout`,
  getPortShow: (id: string = ":portId") => `/ports/${id}`,
  getPortsList: () => "/ports",
  getPlay: () => "/play",
  getPlayShip: (id: string = ":shipId") => `/play/${id}`,
  getPlayShipEdit: (id: string = ":shipId") => `/play/${id}/edit`,
  getProfile: () => "/profile",
  getProfileDelete: () => "/profile/delete",
  getHome: () => "/"
};

export const matches = [
  // about
  {
    path: routes.getAboutCheating(),
    exact: true,
    component: About.Cheating,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutDuplicate(),
    exact: true,
    component: About.Duplicate,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutPolicies(),
    exact: true,
    component: About.Policies,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutStatus(),
    exact: true,
    component: About.Status,
    cacheType: CacheType.Public,
    maxAge: 30
  },
  {
    path: routes.getAbout(),
    exact: true,
    component: About.default,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },

  // ports
  {
    path: routes.getPortShow(),
    exact: true,
    component: Ports.Port,
    cacheType: CacheType.Public,
    maxAge: 600
  },
  {
    path: routes.getPortsList(),
    exact: true,
    component: Ports.default,
    cacheType: CacheType.Public,
    maxAge: 600
  },

  // login
  {
    path: routes.getLoginEmail(),
    exact: true,
    component: Login.Email,
    cacheType: CacheType.None
  },
  {
    path: routes.getLogin(),
    exact: true,
    component: Login.default,
    cacheType: CacheType.None
  },

  // profile
  {
    path: routes.getProfileDelete(),
    exact: true,
    component: Profile.Delete,
    cacheType: CacheType.None
  },
  {
    path: routes.getProfile(),
    exact: true,
    component: Profile.default,
    cacheType: CacheType.Private,
    maxAge: 5
  },

  // play
  {
    path: routes.getPlay(),
    exact: false, // play is the client side app that'll have sub-routes
    component: Play.default,
    cacheType: CacheType.Public,
    maxAge: 3600
  },

  // home
  {
    path: routes.getHome(),
    exact: true,
    component: Home.default,
    cacheType: CacheType.Public,
    maxAge: 600
  }
] as RouteItem[];

export default routes;
