import ActionTokenInterface from "./ActionTokenInterface";
import ShipClassInterface from "./ShipClassInterface";

export default interface TransactionInterface {
  actionToken: ActionTokenInterface;
  cost: number;
  currentCount: number;
}

export interface ShipUpgradeInterface extends TransactionInterface {
  detail: ShipClassInterface;
}

export interface HealthIncreaseInterface extends TransactionInterface {
  detail: number;
}
