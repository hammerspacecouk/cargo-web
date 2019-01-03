import { RouteProps } from "react-router-dom";
import { About } from "./server/About";
import { Cheating } from "./server/About/Cheating";
import { Duplicate } from "./server/About/Duplicate";
import { Policies } from "./server/About/Policies";
import { Status } from "./server/About/Status";
import { Home } from "./server/Home";
import { Login } from "./server/Login";
import { Email } from "./server/Login/Email";
import { Play } from "./server/Play";
import { Ports } from "./server/Ports";
import { Port } from "./server/Ports/Port";
import { Profile } from "./server/Profile";
import { Delete } from "./server/Profile/Delete";
import { Environment } from "./util/Environment";

export enum CacheType {
  None = "no-cache, no-store",
  Private = "private",
  Public = "public",
}

export interface IRouteItem extends RouteProps {
  cacheType?: CacheType;
  maxAge?: number;
}

export const routes = {
  getAbout: () => "/about",
  getAboutCheating: () => "/about/cheating",
  getAboutDuplicate: () => "/about/duplicate",
  getAboutPolicies: () => "/about/policies",
  getAboutStatus: () => "/about/status",
  getHome: () => "/",
  getLogin: () => "/login",
  getLoginAnonymous: () => `${Environment.apiHostname}/login/anonymous`,
  getLoginEmail: () => "/login/email",
  getLogout: () => `${Environment.apiHostname}/logout`,
  getPlay: () => "/play",
  getPlayShip: (id: string = ":shipId") => `/play/${id}`,
  getPortShow: (id: string = ":portId") => `/ports/${id}`,
  getPortsList: () => "/ports",
  getProfile: () => "/profile",
  getProfileDelete: () => "/profile/delete",
};

export const matches = [
  // about
  {
    cacheType: CacheType.Public,
    component: Cheating,
    exact: true,
    maxAge: 3600 * 2,
    path: routes.getAboutCheating(),
  },
  {
    cacheType: CacheType.Public,
    component: Duplicate,
    exact: true,
    maxAge: 3600 * 2,
    path: routes.getAboutDuplicate(),
  },
  {
    cacheType: CacheType.Public,
    component: Policies,
    exact: true,
    maxAge: 3600 * 2,
    path: routes.getAboutPolicies(),
  },
  {
    cacheType: CacheType.Public,
    component: Status,
    exact: true,
    maxAge: 30,
    path: routes.getAboutStatus(),
  },
  {
    cacheType: CacheType.Public,
    component: About,
    exact: true,
    maxAge: 3600 * 2,
    path: routes.getAbout(),
  },

  // ports
  {
    cacheType: CacheType.Public,
    component: Port,
    exact: true,
    maxAge: 600,
    path: routes.getPortShow(),
  },
  {
    cacheType: CacheType.Public,
    component: Ports,
    exact: true,
    maxAge: 600,
    path: routes.getPortsList(),
  },

  // login
  {
    cacheType: CacheType.None,
    component: Email,
    exact: true,
    path: routes.getLoginEmail(),
  },
  {
    cacheType: CacheType.None,
    component: Login,
    exact: true,
    path: routes.getLogin(),
  },

  // profile
  {
    cacheType: CacheType.None,
    component: Delete,
    exact: true,
    path: routes.getProfileDelete(),
  },
  {
    cacheType: CacheType.Private,
    component: Profile,
    exact: true,
    maxAge: 5,
    path: routes.getProfile(),
  },

  // play
  {
    cacheType: CacheType.Public,
    component: Play,
    exact: false, // play is the client side app that'll have sub-routes
    maxAge: 3600,
    path: routes.getPlay(),
  },

  // home
  {
    cacheType: CacheType.Public,
    component: Home,
    exact: true,
    maxAge: 600,
    path: routes.getHome(),
  },
] as IRouteItem[];
