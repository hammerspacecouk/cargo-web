import {Dispatch} from "redux";

import PlayActionTypes from './ActionTypes';
import EditShipActionTypes from '../EditShip/ActionTypes';

import {APIClientInterface} from "../../Data/API/index";

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
};
