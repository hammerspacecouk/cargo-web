import ActionTokenInterface from "./ActionTokenInterface";

export default interface CrateInterface {
  contents: string;
  value: number;
};

export interface CrateActionInterface {
  crate: CrateInterface;
  token?: ActionTokenInterface;
}
