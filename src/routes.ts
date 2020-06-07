import { Environment } from "./utils/environment";

export const routes = {
  getAbout: () => "/about",
  getAboutCheating: () => "/about/cheating",
  getAboutDuplicate: () => "/about/duplicate", // todo - shouldn't be needed now
  getAboutPolicies: () => "/about/policies",
  getAboutStatus: () => "/about/status",
  getDeleteAccount: () => "/delete",
  getResetAccount: () => "/reset",
  getHome: () => "/",
  getLogin: () => "/login",
  getLoginAnonymous: () => `${Environment.clientApiHostname}/login/anonymous`,
  getLogout: () => `${Environment.clientApiHostname}/logout`,
  getPlay: () => "/play",
  getPlayer: (id: string = ":player") => ({ href: `/players/[player]?player=${id}`, as: `/players/${id}` }),
  getPlayProfile: () => "/play/profile",
  getPlayLaunch: () => "/play/launch",
  getPlayShip: (id: string = ":shipId") => ({ href: `/play/[ship]?ship=${id}`, as: `/play/${id}` }),
  getPortsList: () => "/ports",
  getPurchaseUpgrade: () => "/purchase/upgrade",
};
