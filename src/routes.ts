import About from "./Pages/About";
import AboutCheating from "./Pages/About/CheatingContainer";
import AboutDuplicate from "./Pages/About/DuplicateContainer";
import AboutPolicies from "./Pages/About/PoliciesContainer";
import AboutStatus from "./Pages/About/StatusContainer";
import AboutStyleGuide from "./Pages/About/StyleGuideContainer";
import Home from "./Pages/Home";
import Login from "./Pages/LoginContainer";
import LoginEmail from "./Pages/LoginEmailContainer";
import Play from "./Pages/Play";
import PortsList from "./Pages/Ports/ListContainer";
import PortShow from "./Pages/Ports/ShowContainer";
import Profile from "./Pages/Profile";
import ProfileDelete from "./Pages/Profile/DeleteContainer";
import { RouteProps } from "react-router";
import Environment from "./Infrastructure/Environment";

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
  getAboutStyleGuide: () => "/about/styleguide",
  getLogin: () => "/login",
  getLoginEmail: () => "/login/email",
  getLogout: () => `${Environment.apiHostname}/logout`,
  getPortShow: (id: string = ":portId") => `/ports/${id}`,
  getPortsList: () => "/ports",
  getPlay: () => "/play",
  getProfile: () => "/profile",
  getProfileDelete: () => "/profile/delete",
  getHome: () => "/"
};

export const matches = [
  // about
  {
    path: routes.getAboutCheating(),
    exact: true,
    component: AboutCheating,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutDuplicate(),
    exact: true,
    component: AboutDuplicate,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutPolicies(),
    exact: true,
    component: AboutPolicies,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAboutStatus(),
    exact: true,
    component: AboutStatus,
    cacheType: CacheType.Public,
    maxAge: 30
  },
  {
    path: routes.getAboutStyleGuide(),
    exact: true,
    component: AboutStyleGuide,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },
  {
    path: routes.getAbout(),
    exact: true,
    component: About,
    cacheType: CacheType.Public,
    maxAge: 3600 * 2
  },

  // ports
  {
    path: routes.getPortShow(),
    exact: true,
    component: PortShow,
    cacheType: CacheType.Public,
    maxAge: 600
  },
  {
    path: routes.getPortsList(),
    exact: true,
    component: PortsList,
    cacheType: CacheType.Public,
    maxAge: 600
  },

  // login
  {
    path: routes.getLoginEmail(),
    exact: true,
    component: LoginEmail,
    cacheType: CacheType.None
  },
  {
    path: routes.getLogin(),
    exact: true,
    component: Login,
    cacheType: CacheType.None
  },

  // profile
  {
    path: routes.getProfileDelete(),
    exact: true,
    component: ProfileDelete,
    cacheType: CacheType.None
  },
  {
    path: routes.getProfile(),
    exact: true,
    component: Profile,
    cacheType: CacheType.Private,
    maxAge: 5
  },

  // play
  {
    path: routes.getPlay(),
    exact: false, // play is the client side app that'll have sub-routes
    component: Play,
    cacheType: CacheType.Public,
    maxAge: 3600
  },

  // home
  {
    path: routes.getHome(),
    exact: true,
    component: Home,
    cacheType: CacheType.Public,
    maxAge: 600
  }
] as RouteItem[];

export default routes;
