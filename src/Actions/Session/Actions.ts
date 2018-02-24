import SessionActionTypes from './ActionTypes';
import {Dispatch} from "redux";
import {APIClientInterface} from "../../Data/API";

export const refreshSession = async (apiClient: APIClientInterface, dispatch: Dispatch<any>): Promise<void> => {

    dispatch({type: SessionActionTypes.FETCHING_PLAYER});

    const data = await apiClient.fetch('/login/check');
    if (data.loggedIn) {
        dispatch({type: SessionActionTypes.SCORE_UPDATED, payload: data.player.score});
        dispatch({type: SessionActionTypes.PLAYER_RANK_UPDATED, payload: data.player.rankStatus,});
        dispatch({type: SessionActionTypes.SHIPS_UPDATED, payload: data.ships});
        dispatch({type: SessionActionTypes.FETCHED_PLAYER, payload: data.player});
        return;
    }

    dispatch({type: SessionActionTypes.FETCHED_GUEST, payload: data.loginToken});
};
