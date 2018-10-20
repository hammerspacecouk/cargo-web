import PortInterface from "./PortInterface";
import ActionTokenInterface from "./ActionTokenInterface";
import { RankInterface } from "./RankStatusInterface";

export default interface DirectionInterface {
  destination: PortInterface;
  distanceUnit: number;
  earnings: number;
  journeyTimeSeconds: number;
  action: ActionTokenInterface;
  minimumRank?: RankInterface;
  minimumStrength?: number;
};
