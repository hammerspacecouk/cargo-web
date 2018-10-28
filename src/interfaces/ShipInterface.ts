import PlayerInterface from "./PlayerInterface";
import ShipClassInterface from "./ShipClassInterface";

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
