import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import API from "../Data/API";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";

export interface SessionResponseInterface {
  readonly loggedIn: boolean;
  readonly player?: PlayerInterface;
  readonly ships: ShipInterface[];
}

export const getSession = (): Promise<SessionResponseInterface> => {
  return API.fetch("/login/check");
};
