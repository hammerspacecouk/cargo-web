import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import API from "../Infrastructure/API";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import PortInterface from "../DomainInterfaces/PortInterface";

export interface SessionResponseInterface {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: PlayerInterface;
  readonly rankStatus?: RankStatusInterface;
}

export interface ProfileResponseInterface {
  readonly player: PlayerInterface;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: PortInterface;
}

export const getSession = (
  cookies?: any
): Promise<SessionResponseInterface> => {
  return API.fetch("/login/check", null, cookies);
};

export const getEmailLoginToken = (token: string): ActionTokenInterface => {
  return {
    path: "/login/email",
    token
  };
};

export const getProfileData = (
  cookies?: any
): Promise<ProfileResponseInterface> => {
  return API.fetch("/profile", null, cookies);
};

export const getDeleteProfileToken = (
  token: string = ""
): ActionTokenInterface => {
  return {
    path: "/profile/delete",
    token
  };
};
