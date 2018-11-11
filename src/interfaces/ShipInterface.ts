import PlayerInterface from "./PlayerInterface";
import ShipClassInterface from "./ShipClassInterface";
import TransactionInterface from "./TransactionInterface";

export default interface ShipInterface {
  id: string;
  name: string;
  owner?: PlayerInterface;
  shipClass?: ShipClassInterface;
  strengthPercent: number;
  location?: {
    name?: string; // todo - use a location interface
    safeHaven?: boolean;
  };
};

export default interface FleetShipInterface {
  renameToken: TransactionInterface;
  ship: ShipInterface;
};
