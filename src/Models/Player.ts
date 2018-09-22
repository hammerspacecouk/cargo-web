import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import API from "../Infrastructure/API";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import { SessionResponseInterface } from "./Session";
import EventInterface from "../DomainInterfaces/EventInterface";

export interface AcknowledgePromotionResponse {
  readonly rankStatus: RankStatusInterface;
}

export interface FleetResponseInterface {
  readonly ships: ShipInterface[];
  readonly events: EventInterface[];
  readonly session: SessionResponseInterface;
}

export const acknowledgePromotion = (
  token: ActionTokenInterface
): Promise<AcknowledgePromotionResponse> => {
  return API.fetch(token.path, { token: token.token });
};

export const getFleetData = (): Promise<FleetResponseInterface> => {
  return API.fetch('/play');
};
