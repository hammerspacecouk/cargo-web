import API from "../Infrastructure/API";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import PortInterface from "../DomainInterfaces/PortInterface";
import ChannelInterface from "../DomainInterfaces/ChannelInterface";
import DirectionsInterface from "../DomainInterfaces/DirectionsInterface";
import ShipNameTokenInterface from "../DomainInterfaces/ShipNameTokenInterface";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import EventInterface from "../DomainInterfaces/EventInterface";
import { CrateActionInterface } from "../DomainInterfaces/CrateInterface";

export interface ShipLocationResponse {
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
  readonly requestShipName: ShipNameTokenInterface;
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

export const moveShip = async (
  token: ActionTokenInterface
): Promise<ShipLocationResponse> => {
  return API.fetch(token.path, { token: token.token });
};
