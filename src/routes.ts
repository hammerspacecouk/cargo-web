import { Environment } from "./utils/environment";

export const routes = {
  getAbout: () => "/about",
  getAboutCheating: () => "/about/cheating",
  getAboutDuplicate: () => "/about/duplicate", // todo - shouldn't be needed now
  getAboutPolicies: () => "/about/policies",
  getAboutStatus: () => "/about/status",
  getDeleteAccount: () => "/delete",
  getHome: () => "/",
  getLogin: () => "/login",
  getLoginAnonymous: () => `${Environment.clientApiHostname}/login/anonymous`,
  getLogout: () => `${Environment.clientApiHostname}/logout`,
  getPlay: () => "/play",
  getPlayHome: () => "/play/profile",
  getPlayLaunch: () => "/play/launch",
  getPlayShip: (id: string = ":shipId") => ({ href: `/play/[ship]?ship=${id}`, as: `/play/${id}` }),
  getPortsList: () => "/ports",
};
