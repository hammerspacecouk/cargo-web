import {Dispatch} from "redux";

import PlayActionTypes from './ActionTypes';
import EditShipActionTypes from '../EditShip/ActionTypes';
import SessionActionTypes from '../Session/ActionTypes';

import {APIClientInterface} from "../../Data/API";
import {TokenHandlerInterface} from "../TokenHandlerInterface";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";

export const fetchShipData = async (
    shipId: string,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    const data = await apiClient.fetch(`/play/${shipId}`);
    if (!data) {
        return;
    }
    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_DATA,
        payload: data.ship
    });

    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_LOCATION,
        payload: data
    });

    dispatch({
        type: SessionActionTypes.SCORE_UPDATED,
        payload: data.playerScore,
    });

    dispatch({
        type: SessionActionTypes.PLAYER_RANK_UPDATED,
        payload: data.playerRankStatus,
    });
};

export const changeShip = async (
    shipId: string,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({type: PlayActionTypes.CHANGING_SHIP});

    const data = await apiClient.fetch(`/play/${shipId}`);
    if (!data) {
        dispatch({type: PlayActionTypes.RECEIVED_NO_SUCH_SHIP});
        return;
    }

    dispatch({
        type: EditShipActionTypes.RECEIVED_TOKEN_REQUEST_SHIP_NAME,
        payload: data.requestShipNameToken
    });

    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_DATA,
        payload: data.ship
    });

    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_LOCATION,
        payload: data
    });

    if (data.playerScore) {
        dispatch({
            type: SessionActionTypes.SCORE_UPDATED,
            payload: data.playerScore,
        });
    }
};

export const moveShip: TokenHandlerInterface = async (
    token: ActionTokenInterface,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({type: PlayActionTypes.DEPARTING_PORT});

    const data = await apiClient.fetch(token.path, {token:token.token});
    if (!data) {
        // todo - some sort of error state action
        return;
    }

    dispatch({
        type: PlayActionTypes.RECEIVED_SHIP_LOCATION,
        payload: data,
    });
    dispatch({
        type: SessionActionTypes.SCORE_UPDATED,
        payload: data.playerScore,
    });
};
