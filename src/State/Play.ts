import {ActionInterface} from "../Actions/ActionInterface";
import PlayActionTypes from "../Actions/Play/ActionTypes";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";

export interface PlayStateInterface {
    ship?: ShipInterface;
    requestShipNameToken?: ActionTokenInterface;
    fetching: boolean;
}

const initialState: PlayStateInterface = {
    ship: null,
    fetching: false,
};

export default (state: PlayStateInterface = initialState, action: ActionInterface): PlayStateInterface => {
    const newState: PlayStateInterface = Object.assign({}, state);
    switch (action.type) {
        case PlayActionTypes.CHANGING_VIEW:
            newState.fetching = true;
            newState.ship = null;
            newState.requestShipNameToken = null;
            return newState;
        case PlayActionTypes.CHANGED_VIEW:
            newState.ship = action.payload.ship;
            newState.requestShipNameToken = action.payload.requestShipNameToken;
            newState.fetching = false;
            return newState;
        default:
            return state;
    }
};
