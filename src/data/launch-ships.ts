import http from "http";
import { ApiClient } from "../utils/ApiClient";
import { IPort, IShip, IShipUpgrade } from "../interfaces";

export const getAvailableShips = (
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<ILaunchShipsResponse> => {
  return ApiClient.fetch('/play/inventory', undefined, incomingRequest, outGoingResponse);
};

export interface ILaunchShipsResponse {
  ships: IShipUpgrade[];
}

export interface ILaunchEvent {
  newShip: IShip;
  atPort: IPort;
}
