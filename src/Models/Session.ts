import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import API from "../Data/API";

export interface SessionResponseInterface {
  readonly loggedIn: boolean;
  readonly hasSetEmail: boolean;
  readonly player?: PlayerInterface;
  readonly ships: ShipInterface[];
  readonly rankStatus?: RankStatusInterface;
}

export const getSession = (
  allowNewPlayer: boolean
): Promise<SessionResponseInterface> => {
  const path = allowNewPlayer ? "/play" : "/login/check";
  return API.fetch(path);
};
