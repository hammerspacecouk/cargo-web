import ActionTokenInterface from "./ActionTokenInterface";

export default interface CrateInterface {
  id: string;
  contents: string;
  value: number;
}

export interface CrateActionInterface {
  crate: CrateInterface;
  valuePerLY: number;
  token?: ActionTokenInterface;
}
