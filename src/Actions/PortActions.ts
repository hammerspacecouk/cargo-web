import PortActionTypes from './PortActionTypes';
import {Dispatch} from "redux";

import DataClient from "../Models/DataClient";
import {Port} from "../Domain/Port";

export const fetchList = async (dispatch: Dispatch<any>): Promise<void> => {
    const data = await DataClient.fetchData('/ports');
    const ports = data.items.map((item: any) => {
        return new Port(item.id, item.name)
    });
    dispatch({
        type: PortActionTypes.FETCH_LIST,
        payload: ports
    });
};

export const fetchSingle = async (id: string, dispatch: Dispatch<any>): Promise<void> => {
    const port = await DataClient.fetchData(`/ports/${id}`);
    dispatch({
        type: PortActionTypes.FETCH_SINGLE,
        payload: port
    });
};
