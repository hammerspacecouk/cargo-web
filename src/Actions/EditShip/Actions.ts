import {Dispatch} from "redux";

import EditActionTypes from './ActionTypes';
import PlayActionTypes from '../Play/ActionTypes';
import SessionActionTypes from '../Session/ActionTypes';
import {APIClientInterface} from "../../Data/API/index";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import {TokenHandlerInterface} from "../TokenHandlerInterface";

export const requestShipName: TokenHandlerInterface = async (
    token: ActionTokenInterface,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({type: EditActionTypes.REQUESTING_SHIP_NAME});

    const data = await apiClient.fetch(`${token.path}?token=${token.token}`); // todo - use POST
    if (!data) {
        // todo - some sort of error state action
        return;
    }

    dispatch({
        type: EditActionTypes.RECEIVED_SHIP_NAME_OFFER,
        payload: data
    });

    dispatch({
        type: EditActionTypes.RECEIVED_TOKEN_REQUEST_SHIP_NAME,
        payload: data.requestShipNameToken
    });

    // update the user score
    dispatch({
        type: SessionActionTypes.SCORE_UPDATED,
        payload: data.newScore
    });
};

export const acceptShipName: TokenHandlerInterface = async (
    token: ActionTokenInterface,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({type: EditActionTypes.ACCEPTING_SHIP_NAME});

    const data = await apiClient.fetch(`${token.path}?token=${token.token}`); // todo - use POST
    if (!data) {
        // todo - some sort of error state action
        return;
    }

    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_DATA,
        payload: data.ship
    });

    dispatch({type: EditActionTypes.ACCEPTED_SHIP_NAME});
};
