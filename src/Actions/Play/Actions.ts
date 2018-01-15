import PlayActionTypes from './ActionTypes';
import {Dispatch} from "redux";

import {Ship} from "../../Domain/Ship";
import {APIClientInterface} from "../../Data/API/index";

export const fetchShip = async (
    shipId: string,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
): Promise<void> => {
    dispatch({
        type: PlayActionTypes.CHANGING_VIEW
    });

    const data = await apiClient.fetch(`/play/${shipId}`);

    dispatch({
        type: PlayActionTypes.CHANGED_VIEW,
        payload: data
    });
};
