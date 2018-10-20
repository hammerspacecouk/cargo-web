import PlayerInterface from "./PlayerInterface";
import ShipInterface from "./ShipInterface";
import PortInterface from "./PortInterface";
import { RankInterface } from "./RankStatusInterface";
import CrateInterface from "./CrateInterface";

// same as constants from Event.php, with 'public' swapped for 'export'
export const ACTION_CRATE_NEW = 'crate_new';
export const ACTION_CRATE_PICKUP = 'crate_pickup';

export const ACTION_PLAYER_NEW = "player_new";
export const ACTION_PLAYER_PROMOTION = "player_promotion";

export const ACTION_SHIP_NEW = "ship_new";
export const ACTION_SHIP_ARRIVAL = "ship_arrival";
export const ACTION_SHIP_DEPARTURE = "ship_departure";
export const ACTION_SHIP_RENAME = "ship_rename";

export default interface EventInterface {
  id: string;
  action: string;
  time: string;
  value: string;
  crate: CrateInterface;
  actioningPlayer?: PlayerInterface;
  actioningShip?: ShipInterface;
  ship?: ShipInterface;
  port?: PortInterface;
  rank?: RankInterface;
};
