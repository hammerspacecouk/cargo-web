import {ActionInterface} from "../Actions/ActionInterface";
import EditShipActionTypes from "../Actions/EditShip/ActionTypes";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";

export interface EditShipStateInterface {
    requestingShipName: boolean;
    acceptingShipName: boolean;
    offeredShipName?: string;
    requestShipNameToken?: ActionTokenInterface;
    offeredShipNameToken?: ActionTokenInterface;
}

const initialState: EditShipStateInterface = {
    requestingShipName: false,
    acceptingShipName: false,
    offeredShipName: null,
    offeredShipNameToken: null,
    requestShipNameToken: null,
};

export default (state: EditShipStateInterface = initialState, action: ActionInterface): EditShipStateInterface => {
    const newState: EditShipStateInterface = Object.assign({}, state);
    switch (action.type) {
        case EditShipActionTypes.RECEIVED_TOKEN_REQUEST_SHIP_NAME:
            newState.requestShipNameToken = action.payload;
            return newState;
        case EditShipActionTypes.REQUESTING_SHIP_NAME:
            newState.requestingShipName = true;
            newState.offeredShipName = null;
            return newState;
        case EditShipActionTypes.ACCEPTING_SHIP_NAME:
            newState.offeredShipName = null;
            newState.acceptingShipName = true;
            return newState;
        case EditShipActionTypes.ACCEPTED_SHIP_NAME:
            newState.offeredShipName = null;
            newState.acceptingShipName = false;
            return newState;
        case EditShipActionTypes.RECEIVED_SHIP_NAME_OFFER:
            newState.offeredShipName = action.payload.nameOffered;
            newState.offeredShipNameToken = action.payload.action;
            newState.requestingShipName = false; // todo - remove this, and call via ACKNOWLEDGE_SHIP_NAME_OFFER
            return newState;
        case EditShipActionTypes.ACKNOWLEDGE_SHIP_NAME_OFFER:
            newState.requestingShipName = false;
            return newState;
        case EditShipActionTypes.REJECT_SHIP_NAME_OFFER:
            newState.offeredShipName = null;
            newState.offeredShipNameToken = null;
            return newState;
        default:
            return state;
    }
};
