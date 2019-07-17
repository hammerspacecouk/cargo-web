import http from "http";
import { ApiClient } from "../utils/ApiClient";
import { IEvent, IFleetShip, IPlayer, IRankStatus } from "../interfaces";

export const getSession = (
  headers?: http.IncomingHttpHeaders,
  response?: http.ServerResponse
): Promise<IGameSessionResponse> => {
  return ApiClient.fetch("/play", undefined, headers, response);
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
  readonly hasProfileNotification: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
}
