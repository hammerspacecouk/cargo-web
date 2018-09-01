import API, { APIClientInterface } from "../Data/API";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import PortInterface from "../DomainInterfaces/PortInterface";
import ChannelInterface from "../DomainInterfaces/ChannelInterface";
import DirectionsInterface from "../DomainInterfaces/DirectionsInterface";
import ShipNameTokenInterface from "../DomainInterfaces/ShipNameTokenInterface";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";

export interface PlayShipResponse {
  readonly ship: ShipInterface;
  readonly requestShipName: ShipNameTokenInterface;
  readonly port?: PortInterface;
  readonly channel?: ChannelInterface;
  readonly directions?: DirectionsInterface;
  readonly shipsInLocation?: ShipInterface[];
  readonly playerScore?: ScoreInterface;
  readonly playerRankStatus?: RankStatusInterface;
}

export interface RequestShipNameResponse {
  readonly requestShipName: ShipNameTokenInterface;
  readonly newScore: ScoreInterface;
  readonly nameOffered: string;
  readonly offeredShipNameToken: ActionTokenInterface;
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
): Promise<PlayShipResponse> => {
  return API.fetch(token.path, { token: token.token });
};
