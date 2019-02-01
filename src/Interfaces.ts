export interface IActionToken {
  path: string;
  token: string;
}

export interface IPort {
  id: string;
  name: string;
  safeHaven: boolean;
}

export interface IChannel {
  destination: IPort;
  startTime: string;
  arrival: string;
}

export interface ICrate {
  id: string;
  contents: string;
  value: number;
}

export interface ICrateAction {
  crate: ICrate;
  valuePerLY: number;
  token?: IActionToken;
}

export interface IRank {
  title: string;
}

export interface IRankStatus {
  acknowledgeToken?: IActionToken;
  portsVisited: number;
  levelProgress: number;
  currentRank: IRank;
  previousRank: IRank;
  nextRank: IRank;
}

interface IDirectionDetail {
  destination: IPort;
  distanceUnit: number;
  earnings: number;
  journeyTimeSeconds: number;
  minimumRank?: IRank;
  minimumStrength?: number;
  denialReason?: string;
}

export interface IDirection {
  action: IActionToken;
  detail: IDirectionDetail;
}

export interface IDirections {
  NW?: IDirection;
  NE?: IDirection;
  E?: IDirection;
  SE?: IDirection;
  SW?: IDirection;
  W?: IDirection;
}

// same as constants from Event.php, with 'public' swapped for 'export'
export const ACTION_CRATE_NEW = "crate_new";
export const ACTION_CRATE_PICKUP = "crate_pickup";
export const ACTION_EFFECT_USE = "effect_use";
export const ACTION_PLAYER_NEW = "player_new";
export const ACTION_PLAYER_PROMOTION = "player_promotion";
export const ACTION_SHIP_NEW = "ship_new";
export const ACTION_SHIP_ARRIVAL = "ship_arrival";
export const ACTION_SHIP_DEPARTURE = "ship_departure";
export const ACTION_SHIP_RENAME = "ship_rename";

export interface IScore {
  value: number;
  rate: number;
  datetime: string;
}

export interface IPlayer {
  id: string;
  colour: string; // todo -remove
  emblem: string;
  startedAt: string;
  score?: IScore;
}

export interface ITransaction {
  actionToken: IActionToken;
  cost: number;
  currentCount: number;
}

export interface IShipUpgrade extends ITransaction {
  detail: IShipClass;
}

export interface IEffectUpgrade extends ITransaction {
  detail: IEffect;
}

export interface IHealthIncrease extends ITransaction {
  detail: number;
}

export interface IDefenceOption {
  actionToken?: IActionToken;
  effect: IEffect;
  hitsRemaining?: number;
  expiry?: string;
}

export interface IFleetShip {
  ship: IShip;
  needsAttention: boolean;
  renameToken: ITransaction;
  health: IHealthIncrease[];
  defenceOptions: IDefenceOption[];
}

export interface IShip {
  id: string;
  name: string;
  owner?: IPlayer;
  shipClass?: IShipClass;
  isDestroyed: boolean;
  strengthPercent: number;
  location?: {
    name?: string; // todo - use a location interface
    safeHaven?: boolean;
  };
}

export interface IEvent {
  id: string;
  action: string;
  time: string;
  value: string;
  crate: ICrate;
  actioningPlayer?: IPlayer;
  actioningShip?: IShip;
  ship?: IShip;
  port?: IPort;
  rank?: IRank;
  effect?: IEffect;
}

export interface IKeyValue {
  [key: string]: string;
}

export interface IMessage {
  type: string;
  message: string;
}

export interface IChildrenProps {
  children: any;
}

export interface IEffect {
  name: string;
  description: string;
}

export interface IShipClass {
  name: string;
  description: string;
  capacity: number;
  image: string;
}
