import http from "http";
import { ApiClient } from "../utils/ApiClient";
import {
  IChannel,
  ICrateAction,
  IDirections,
  IEffect,
  IEffectUpgrade,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IPort, IRankStatus, IScore,
  IShip,
  ITacticalOption,
  ITransaction
} from "../interfaces";

export const getShipData = (shipId: string, headers?: http.IncomingHttpHeaders): Promise<IActiveShipResponse> => {
  return ApiClient.fetch(`/play/${shipId}`, undefined, headers);
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
  purchaseOptions: IEffectUpgrade[];
  channel: IChannel;
  port: IPort;
  hint: string;
}
