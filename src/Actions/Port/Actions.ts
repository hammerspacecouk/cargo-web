import PortActionTypes from './ActionTypes';
import {Dispatch} from "redux";

import {Port} from "../../Domain/Port";
import {APIClientInterface} from "../../Data/API/index";

export const fetchList = async (apiClient: APIClientInterface, dispatch: Dispatch<any>): Promise<void> => {
    dispatch({type: PortActionTypes.FETCHING_LIST});

    const data = await apiClient.fetch('/ports');
    const ports = data.items.map((item: any) => {
        return new Port(item.id, item.name)
    });
    dispatch({
        type: PortActionTypes.FETCHED_LIST,
        payload: ports
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
