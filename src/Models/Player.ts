import ActionTokenInterface from "../interfaces/ActionTokenInterface";
import API from "../util/HttpClient";
import RankStatusInterface from "../interfaces/RankStatusInterface";
import ShipInterface from "../interfaces/ShipInterface";
import { SessionResponseInterface } from "./Session";
import EventInterface from "../interfaces/EventInterface";
import ShipClassInterface from "../interfaces/ShipClassInterface";
import TransactionInterface from "../interfaces/TransactionInterface";
import { RequestShipNameResponse } from "./Ship";
import ScoreInterface from "../interfaces/ScoreInterface";
import MessageInterface from "../interfaces/MessageInterface";

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
