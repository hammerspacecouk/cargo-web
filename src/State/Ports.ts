import {ActionInterface} from "../Actions/ActionInterface";
import PortActionTypes from "../Actions/Port/ActionTypes";
import PortInterface from "../DomainInterfaces/PortInterface";

export interface PortsStateInterface {
    listedPorts?: PortInterface[];
    port?: PortInterface;
    fetchingList: boolean;
    fetchingPort: boolean;
}

const initialState: PortsStateInterface = {
    listedPorts: null,
    fetchingList: false,
    port: null,
    fetchingPort: false,
};

export default (state: PortsStateInterface = initialState, action: ActionInterface): PortsStateInterface => {
    const newState: PortsStateInterface = Object.assign({}, state);
    switch (action.type) {
        case PortActionTypes.FETCHING_LIST:
            newState.listedPorts = null;
            newState.fetchingList = true;
            return newState;
        case PortActionTypes.FETCHED_LIST:
            newState.listedPorts = action.payload;
            newState.fetchingList = false;
            return newState;
        case PortActionTypes.FETCHING_SINGLE:
            newState.port = null;
            newState.fetchingPort = true;
            return newState;
        case PortActionTypes.FETCHED_SINGLE:
            newState.port = action.payload;
            newState.fetchingPort = false;
            return newState;
        default:
            return state;
    }
};
