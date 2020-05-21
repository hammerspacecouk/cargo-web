import http from "http";
import { ApiClient } from "@src/utils/ApiClient";
import {
  IActionToken,
  IChannel,
  IConvoyOption,
  ICrateAction,
  IDirections,
  IEffect,
  IEffectPurchase,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IPort,
  IRankStatus,
  IScore,
  IShip,
  ITacticalOption,
  ITransaction,
} from "@src/interfaces";
import { IAuthProvider } from "./profile";

export const getShipData = (
  shipId: string,
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<IActiveShipResponse> => ApiClient.fetch(`/play/${shipId}`, undefined, incomingRequest, outGoingResponse);

export interface IActiveShipResponse {
  bonus: IEffect[];
  cratesInPort: ICrateAction[];
  cratesOnShip: ICrateAction[];
  tacticalOptions: ITacticalOption[];
  convoys: IConvoyOption[];
  leaveConvoy?: IActionToken;
  effectsToPurchase: IEffectPurchase[];
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
  sellToken?: ITransaction;
  blockadeStrength?: number;
}
