import http from "http";
import { ApiClient } from "@src/utils/ApiClient";
import { IPort, IShip, IShipUpgrade } from "@src/interfaces";

export const getAvailableShips = (
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<ILaunchShipsResponse> => ApiClient.fetch("/play/upgrades", undefined, incomingRequest, outGoingResponse);

export interface ILaunchShipsResponse {
  ships: IShipUpgrade[];
}

export interface ILaunchEvent {
  newShip: IShip;
  atPort: IPort;
}
