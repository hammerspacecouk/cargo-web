export interface ActionTokenInterface {
  path: string;
  token: string;
}

export interface PortInterface {
  id: string;
  name: string;
  safeHaven: boolean;
}

export interface ChannelInterface {
  destination: PortInterface;
  startTime: string;
  arrival: string;
}

export interface CrateInterface {
  id: string;
  contents: string;
  value: number;
}

export interface CrateActionInterface {
  crate: CrateInterface;
  valuePerLY: number;
  token?: ActionTokenInterface;
}

export interface RankInterface {
  title: string;
}

export interface RankStatusInterface {
  acknowledgeToken?: ActionTokenInterface;
  portsVisited: number;
  levelProgress: number;
  currentRank: RankInterface;
  previousRank: RankInterface;
  nextRank: RankInterface;
}

export interface DirectionInterface {
  destination: PortInterface;
  distanceUnit: number;
  earnings: number;
  journeyTimeSeconds: number;
  action: ActionTokenInterface;
  minimumRank?: RankInterface;
  minimumStrength?: number;
}

export interface DirectionsInterface {
  NW?: DirectionInterface;
  NE?: DirectionInterface;
  E?: DirectionInterface;
  SE?: DirectionInterface;
  SW?: DirectionInterface;
  W?: DirectionInterface;
}

// same as constants from Event.php, with 'public' swapped for 'export'
export const ACTION_CRATE_NEW = "crate_new";
export const ACTION_CRATE_PICKUP = "crate_pickup";
export const ACTION_PLAYER_NEW = "player_new";
export const ACTION_PLAYER_PROMOTION = "player_promotion";
export const ACTION_SHIP_NEW = "ship_new";
export const ACTION_SHIP_ARRIVAL = "ship_arrival";
export const ACTION_SHIP_DEPARTURE = "ship_departure";
export const ACTION_SHIP_RENAME = "ship_rename";

export interface ScoreInterface {
  value: number;
  rate: number;
  datetime: string;
}

export interface PlayerInterface {
  id: string;
  colour: string; // todo -remove
  emblem: string;
  startedAt: string;
  score?: ScoreInterface;
}

export interface TransactionInterface {
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

export interface FleetShipInterface {
  ship: ShipInterface;
  needsAttention: boolean;
  renameToken: TransactionInterface;
  health: HealthIncreaseInterface[];
}

export interface ShipInterface {
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

export interface EventInterface {
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
}

export interface KeyValueInterface {
  [key: string]: string;
}

export interface MessageInterface {
  type: string;
  message: string;
}

export interface NoPropsInterface {}

export interface ChildrenPropsInterface {
  children: any;
}

export interface ShipClassInterface {
  name: string;
  description: string;
  capacity: number;
  image: string;
}
