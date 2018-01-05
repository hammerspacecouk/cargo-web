import {Port} from "../Domain/Port";
import {ActionInterface} from "../Actions/ActionInterface";
import PortActionTypes from "../Actions/Port/ActionTypes";

export interface PortsStateInterface {
    listedPorts: Port[];
    port?: Port;
}

const initialState: PortsStateInterface = {
    listedPorts: [],
    port: null
};

export default (state: PortsStateInterface = initialState, action: ActionInterface): PortsStateInterface => {
    const newState: PortsStateInterface = Object.assign({}, state);
    switch (action.type) {
        case PortActionTypes.FETCH_LIST:
            newState.listedPorts = action.payload;
            return newState;
        case PortActionTypes.FETCH_SINGLE:
            newState.port = action.payload;
            return newState;
        default:
            return state;
    }
};
