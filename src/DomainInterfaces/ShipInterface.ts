import PlayerInterface from "./PlayerInterface";
import ShipClassInterface from "./ShipClassInterface";

export const PATH_LIST = "/ships";
export const PATH_SHOW = (id: string): string => `/ships/${id}`;
export const PLAY_PATH_SHOW = (id: string): string => `/play/${id}`; // todo -move to routes
export const PLAY_PATH_EDIT = (id: string): string => `/play/${id}/edit`;

export default interface ShipInterface {
  id: string;
  name: string;
  owner?: PlayerInterface;
  shipClass?: ShipClassInterface;
  location?: {
    name?: string; // todo - use a location interface
    safeHaven?: boolean;
  };
};
