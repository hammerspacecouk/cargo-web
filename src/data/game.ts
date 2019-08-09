import http from "http";
import { ApiClient } from "../utils/ApiClient";
import { IEvent, IFleetShip, IPlayer, IRankStatus } from "../interfaces";

export const getSession = (
  incomingRequest?: http.IncomingMessage,
  response?: http.ServerResponse
): Promise<IGameSessionResponse> => {
  return ApiClient.fetch("/play", undefined, incomingRequest, response);
};

export interface IGameSessionResponse {
  fleet: IFleetResponse;
  sessionState: ISessionResponse;
}

interface IFleetResponse {
  ships: IFleetShip[];
  events: IEvent[];
}

interface ISessionResponse {
  readonly isLoggedIn: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
}
