import http from "http";
import { ApiClient } from "@src/utils/ApiClient";
import { IEvent, IFleetShip, IMission, IPlayer, IPort, IRankStatus } from "@src/interfaces";

export const getSession = (
  incomingRequest?: http.IncomingMessage,
  response?: http.ServerResponse
): Promise<IGameSessionResponse> => ApiClient.fetch("/play", undefined, incomingRequest, response);

export interface IGameSessionResponse {
  fleet: IFleetResponse;
  sessionState: ISessionResponse;
  currentMissions: IMission[];
  allMissions: IMission[];
  showTrialEnded: boolean;
  showTrialWarning: boolean;
  tutorialStep: number | null;
  goalCrateLocations: IPort[];
}

export interface IFleetResponse {
  ships: IFleetShip[];
  events: IEvent[];
  hasStarterShip: boolean;
}

interface ISessionResponse {
  readonly isLoggedIn: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
}
