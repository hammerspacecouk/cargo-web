import {Dispatch} from "redux";

import PlayActionTypes from './ActionTypes';
import EditShipActionTypes from '../EditShip/ActionTypes';

import {APIClientInterface} from "../../Data/API/index";
import {TokenHandlerInterface} from "../TokenHandlerInterface";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";

export const fetchShip = async (
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
};

export const moveShip: TokenHandlerInterface = async (
    token: ActionTokenInterface,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({type: PlayActionTypes.DEPARTING_PORT});

    alert('ACCEPTED');

    //
    // const data = await apiClient.fetch(`${token.path}?token=${token.token}`); // todo - use POST
    // if (!data) {
    //     // todo - some sort of error state action
    //     return;
    // }
    //
    // dispatch({
    //     type: PlayActionTypes.RECEIVED_SHIP_DATA,
    //     payload: data.ship
    // });
    //
    // dispatch({type: EditActionTypes.ACCEPTED_SHIP_NAME});
};
