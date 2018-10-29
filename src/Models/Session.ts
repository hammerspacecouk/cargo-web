import PlayerInterface from "../interfaces/PlayerInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";
import ActionTokenInterface from "../interfaces/ActionTokenInterface";
import PortInterface from "../interfaces/PortInterface";

export interface SessionResponseInterface {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: PlayerInterface;
  readonly rankStatus?: RankStatusInterface;
}

export interface ProfileResponseInterface {
  readonly session: SessionResponseInterface;
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
