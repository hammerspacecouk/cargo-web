import PortInterface from "./PortInterface";

export default interface ChannelInterface {
  destination: PortInterface;
  startTime: string;
  arrival: string;
}
