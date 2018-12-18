import PlayerInterface from "./PlayerInterface";
import ShipClassInterface from "./ShipClassInterface";
import TransactionInterface, {
  HealthIncreaseInterface
} from "./TransactionInterface";

export interface FleetShipInterface {
  ship: ShipInterface;
  needsAttention: boolean;
  renameToken: TransactionInterface;
  health: HealthIncreaseInterface[];
}

export default interface ShipInterface {
  id: string;
  name: string;
  owner?: PlayerInterface;
  shipClass?: ShipClassInterface;
  isDestroyed: boolean;
  strengthPercent: number;
  location?: {
    name?: string; // todo - use a location interface
    safeHaven?: boolean;
  };
}
