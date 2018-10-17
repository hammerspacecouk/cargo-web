import PortInterface from "./PortInterface";
import ActionTokenInterface from "./ActionTokenInterface";

export default interface DirectionInterface {
  destination: PortInterface;
  distanceUnit: number;
  journeyTimeSeconds: number;
  action: ActionTokenInterface;
};
