import http from "http";
import { ApiClient } from "../utils/ApiClient";
import {
  IChannel,
  ICrateAction,
  IDirections,
  IEffect,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IPort,
  IRankStatus,
  IScore,
  IShip,
  ITacticalOption,
  ITransaction,
} from "../interfaces";
import { IAuthProvider } from "./profile";

export const getShipData = (
  shipId: string,
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<IActiveShipResponse> => {
  return ApiClient.fetch(`/play/${shipId}`, undefined, incomingRequest, outGoingResponse);
};

export interface IActiveShipResponse {
  bonus: IEffect[];
  cratesInPort: ICrateAction[];
  cratesOnShip: ICrateAction[];
  tacticalOptions: ITacticalOption[];
  directions: IDirections;
  events: IEvent[];
  health: IHealthIncrease[];
  renameToken: ITransaction;
  playerScore: IScore;
  playerRankStatus: IRankStatus;
  ship: IShip;
  shipsInLocation: IOtherShip[];
  channel: IChannel;
  port: IPort;
  hint?: string;
  authProviders?: IAuthProvider[];
  tutorialStep?: number;
}
