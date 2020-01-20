import { ReactNode } from "react";

export interface IActionToken {
  path: string;
  token: string;
}

export interface IPort {
  type: "Port";
  id: string;
  name: string;
  isSafe: boolean;
}

export interface IChannel {
  type: "Channel";
  destination: IPort;
  startTime: string;
  arrival: string;
}

export const isInPort = (location: IChannel | IPort): location is IPort => {
  return (<IPort>location).type === "Port";
};

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

export interface ILoginOptions {
  anon?: IActionToken;
  email?: IActionToken;
  facebook?: string;
  google?: string;
  microsoft?: string;
  twitter?: string;
  reddit?: string;
}

export interface IRank {
  id: string;
  title: string;
}

export interface IRankStatus {
  acknowledgeToken?: IActionToken;
  portsVisited: number;
  levelProgress: number;
  currentRank: IRank;
  previousRank: IRank;
  nextRank: IRank;
  olderRanks: IRank[];
  description?: string;
}

interface IDirectionDetail {
  destination: IPort;
  distanceUnit: number;
  earnings: number;
  journeyTimeSeconds?: number;
  minimumRank?: IRank;
  minimumStrength?: number;
  denialReason?: string;
  isHomePort: boolean;
  lastVisitTime?: string; // ISO datetime
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
export const ACTION_EFFECT_OFFENCE = "effect_offence";
export const ACTION_EFFECT_DESTROYED = "effect_destroyed";
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
  emblem: string;
  startedAt: string;
  score?: IScore;
  rank?: IRank;
}

export interface ILockedTransaction {
  available: boolean;
  requirement: string;
}

export interface ITransaction {
  available: boolean;
  actionToken: IActionToken;
  cost: number;
  currentCount: number;
}

export interface IShipUpgrade extends ITransaction {
  detail: IShipClass;
}

export interface IHealthIncrease extends ITransaction {
  detail: number;
}

export interface IEffectPurchase extends ITransaction {
  detail: IEffect;
}

export interface ITacticalOption extends IEffectAction {
  hitsRemaining?: number;
  expiry?: string;
  isActive?: boolean;
  mustSelectShip?: boolean;
}

export interface IEffectAction {
  actionToken?: IActionToken;
  currentCount?: number;
  effect?: IEffect;
}

export interface IFleetShip {
  ship: IShip;
  needsAttention: boolean;
  renameToken: ITransaction;
  health: IHealthIncrease[];
}

export interface IOtherShip {
  ship: IShip;
  offence?: IEffectAction[];
}

export interface IShip {
  id: string;
  name: string;
  owner?: IPlayer;
  shipClass?: IShipClass;
  isDestroyed: boolean;
  strengthPercent: number;
  location?: IChannel | IPort;
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
  children: ReactNode;
}

export interface IClassNameProps {
  className?: string;
}

export enum EffectType {
  OFFENCE = "OFFENCE",
  DEFENCE = "DEFENCE",
  TRAVEL = "TRAVEL",
}

export interface IEffect {
  id: string;
  name: string;
  description: string;
  type: EffectType;
}

export interface IShipClassStats {
  max: number;
  strength: number;
  capacity: number;
  speed: number;
}

export interface IShipClass {
  id: string;
  name: string;
  description: string;
  strength: number;
  capacity: number;
  image: string;
  stats: IShipClassStats;
}
