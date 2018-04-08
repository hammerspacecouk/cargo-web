import { ActionInterface } from "../Actions/ActionInterface";
import PlayActionTypes from "../Actions/Play/ActionTypes";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import PortInterface from "../DomainInterfaces/PortInterface";
import DirectionsInterface from "../DomainInterfaces/DirectionsInterface";
import ChannelInterface from "../DomainInterfaces/ChannelInterface";

export interface PlayStateInterface {
  ship?: ShipInterface;
  fetching: boolean;
  status?: string;
  currentPort?: PortInterface;
  currentChannel?: ChannelInterface;
  directions?: DirectionsInterface;
  shipsInLocation?: ShipInterface[];
  departingPort: boolean;
}

const initialState: PlayStateInterface = {
  ship: null,
  fetching: false,
  departingPort: false,
  status: null,
  currentPort: null,
  currentChannel: null,
  directions: null,
  shipsInLocation: null
};

export default (
  state: PlayStateInterface = initialState,
  action: ActionInterface
): PlayStateInterface => {
  const newState: PlayStateInterface = Object.assign({}, state);
  switch (action.type) {
    case PlayActionTypes.CHANGING_SHIP:
      newState.fetching = true;
      newState.departingPort = false;
      newState.ship = null;
      newState.currentPort = null;
      newState.currentChannel = null;
      newState.directions = null;
      newState.shipsInLocation = null;
      return newState;
    case PlayActionTypes.RECEIVED_SHIP_DATA:
      newState.ship = action.payload;
      newState.fetching = false;
      return newState;
    case PlayActionTypes.DEPARTING_PORT:
      newState.departingPort = true;
      return newState;
    case PlayActionTypes.RECEIVED_SHIP_LOCATION:
      newState.departingPort = false;
      newState.currentPort = action.payload.port;
      newState.directions = action.payload.directions;
      newState.currentChannel = action.payload.channel;
      newState.shipsInLocation = action.payload.shipsInLocation;
      newState.fetching = false;
      return newState;
    case PlayActionTypes.RECEIVED_NO_SUCH_SHIP:
      newState.ship = null;
      newState.fetching = false;
      return newState;
    default:
      return state;
  }
};
