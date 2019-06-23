import { Environment } from "./utils/environment";

export const routes = {
  getAbout: () => "/about",
  getAboutCheating: () => "/about/cheating",
  getAboutDuplicate: () => "/about/duplicate",
  getAboutPolicies: () => "/about/policies",
  getAboutStatus: () => "/about/status",
  getHome: () => "/",
  getLogin: () => "/login",
  getLoginAnonymous: () => `${Environment.clientApiHostname}/login/anonymous`,
  getLoginEmail: () => "/login/email",
  getLogout: () => `${Environment.clientApiHostname}/logout`,
  getPlay: () => "/play",
  getPlayLog: () => "/play/log",
  getPlayShip: (id: string = ":shipId") => ({href:`/play?shipId=${id}`, as:`/play/${id}`}),
  getPlayShipDirections: (id: string = ":shipId") => `/play/${id}/directions`,
  getPortShow: (id: string = ":portId") => `/ports/${id}`,
  getPortsList: () => "/ports",
  getProfile: () => "/profile",
  getProfileDelete: () => "/profile/delete",
};
