import PortActionTypes from './ActionTypes';
import {Dispatch} from "redux";

import {APIClientInterface} from "../../Data/API";

export const fetchList = async (apiClient: APIClientInterface, dispatch: Dispatch<any>): Promise<void> => {
    dispatch({type: PortActionTypes.FETCHING_LIST});

    const data = await apiClient.fetch('/ports');
    dispatch({
        type: PortActionTypes.FETCHED_LIST,
        payload: data.items
    });
};

export const fetchSingle = async (id: string, apiClient: APIClientInterface,  dispatch: Dispatch<any>): Promise<void> => {
    dispatch({type: PortActionTypes.FETCHING_SINGLE});
    const port = await apiClient.fetch(`/ports/${id}`);
    dispatch({
        type: PortActionTypes.FETCHED_SINGLE,
        payload: port
    });
};
