import { combineReducers } from "redux";
import play, { PlayStateInterface } from "./Play";
import ports, { PortsStateInterface } from "./Ports";
import session, { SessionStateInterface } from "./Session";
import environment, { EnvironmentStateInterface } from "./Environment";
import editShip, { EditShipStateInterface } from "./EditShip";

export interface StateInterface {
  editShip: EditShipStateInterface;
  environment: EnvironmentStateInterface;
  play: PlayStateInterface;
  ports: PortsStateInterface;
  session: SessionStateInterface;
}

// Combine Reducers
export default combineReducers({
  editShip,
  environment,
  play,
  ports,
  session
});
