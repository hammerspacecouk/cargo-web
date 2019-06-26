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
  IPort,
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
  ship: IShip;
  shipsInLocation: IOtherShip[];
  purchaseOptions: IEffectUpgrade[];
  channel: IChannel;
  port: IPort;
  hint: string;
}
