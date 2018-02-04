import PortInterface from "./PortInterface";
import ActionTokenInterface from "./ActionTokenInterface";

export default interface DirectionInterface {
    destination: PortInterface;
    distanceUnit: number;
    journeyTimeMinutes: number;
    action: ActionTokenInterface;
}
