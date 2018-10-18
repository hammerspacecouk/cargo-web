import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import API from "../Infrastructure/API";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import { SessionResponseInterface } from "./Session";
import EventInterface from "../DomainInterfaces/EventInterface";
import ShipClassInterface from "../DomainInterfaces/ShipClassInterface";
import TransactionInterface from "../DomainInterfaces/TransactionInterface";
import { RequestShipNameResponse } from "./Ship";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import MessageInterface from "../DomainInterfaces/MessageInterface";

export interface AcknowledgePromotionResponse {
  readonly rankStatus: RankStatusInterface;
}

export interface FleetResponseInterface {
  readonly activeShips: ShipInterface[];
  readonly destroyedShips: ShipInterface[];
  readonly events: EventInterface[];
  readonly sessionState: SessionResponseInterface;
}

export interface ShipUpgradeInterface extends TransactionInterface {
  detail: ShipClassInterface;
}

export interface UpgradesResponseInterface {
  readonly ships: ShipUpgradeInterface[];
}

export interface PurchaseUpgradeResponseInterface
  extends UpgradesResponseInterface {
  readonly message: MessageInterface;
  readonly newScore: ScoreInterface;
}

export const acknowledgePromotion = (
  token: ActionTokenInterface
): Promise<AcknowledgePromotionResponse> => {
  return API.fetch(token.path, { token: token.token });
};

export const getFleetData = (): Promise<FleetResponseInterface> => {
  return API.fetch("/play");
};

export const getAvailableUpgrades = (): Promise<UpgradesResponseInterface> => {
  return API.fetch("/play/upgrades");
};

export const makeUpgradePurchase = (
  token: ActionTokenInterface
): Promise<PurchaseUpgradeResponseInterface> => {
  return API.fetch(token.path, { token: token.token });
};
