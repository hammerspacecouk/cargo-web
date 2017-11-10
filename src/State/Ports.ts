import {Port} from "../Domain/Port";
import {ActionInterface} from "../Actions/ActionInterface";
import PortActionTypes from "../Actions/PortActionTypes";

export interface PortsStateInterface {
    ports: Port[];
    port?: Port;
}

const initialState: PortsStateInterface = {
    ports: [],
    port: null
};

export default (state: PortsStateInterface = initialState, action: ActionInterface): PortsStateInterface => {
    const newState: PortsStateInterface = Object.assign({}, state);
    switch (action.type) {
        case PortActionTypes.FETCH_LIST:
            newState.ports = action.payload;
            return newState;
        case PortActionTypes.FETCH_SINGLE:
            newState.port = action.payload;
            return newState;
        default:
            return state;
    }
};
