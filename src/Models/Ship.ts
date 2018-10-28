import API from "../util/HttpClient";
import ShipInterface from "../interfaces/ShipInterface";
import PortInterface from "../interfaces/PortInterface";
import ChannelInterface from "../interfaces/ChannelInterface";
import DirectionsInterface from "../interfaces/DirectionsInterface";
import ShipNameTokenInterface from "../interfaces/ShipNameTokenInterface";
import ActionTokenInterface from "../interfaces/ActionTokenInterface";
import ScoreInterface from "../interfaces/ScoreInterface";
import RankStatusInterface from "../interfaces/RankStatusInterface";
import EventInterface from "../interfaces/EventInterface";
import { CrateActionInterface } from "../interfaces/CrateInterface";

export interface ShipLocationResponse {
  // todo - merge with PlayShipResponse
  readonly port?: PortInterface;
  readonly channel?: ChannelInterface;
  readonly directions?: DirectionsInterface;
  readonly shipsInLocation?: ShipInterface[];
  readonly events: EventInterface[];
  readonly playerScore?: ScoreInterface;
  readonly cratesOnShip: CrateActionInterface[];
  readonly cratesInPort?: CrateActionInterface[];
}

export interface PlayShipResponse extends ShipLocationResponse {
  readonly ship: ShipInterface;
  readonly playerRankStatus?: RankStatusInterface;
}

export interface RequestShipNameResponse {
  readonly requestShipName: ShipNameTokenInterface;
  readonly newScore: ScoreInterface;
  readonly nameOffered: string;
  readonly action: ActionTokenInterface;
}

export const getPlayDataByShipId = (
  shipId: string
): Promise<PlayShipResponse> => {
  return API.fetch(`/play/${shipId}`);
};

export const requestShipName = (
  token: ActionTokenInterface
): Promise<RequestShipNameResponse> => {
  return API.fetch(token.path, { token: token.token });
};

export const acceptShipName = async (
  token: ActionTokenInterface
): Promise<ShipInterface> => {
  const data = await API.fetch(token.path, { token: token.token });
  return data.ship;
};

export const doPortAction = async (
  token: ActionTokenInterface
): Promise<PlayShipResponse> => {
  return API.fetch(token.path, { token: token.token });
};
