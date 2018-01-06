import SessionActionTypes from './ActionTypes';
import {Dispatch} from "redux";
import {Player} from "../../Domain/Player";
import {Score} from "../../Domain/Score";
import {APIClientInterface} from "../../Data/API/index";

export const refreshSession = async (apiClient: APIClientInterface, dispatch: Dispatch<any>): Promise<void> => {

    dispatch({type: SessionActionTypes.FETCHING_PLAYER});

    const data = await apiClient.fetch('/login/check');
    let player = null;
    let score = null;
    if (data) {
        player = new Player(data.id);
        score = new Score(data.score.value, data.score.rate, new Date(data.score.datetime))
    }

    dispatch({type: SessionActionTypes.SCORE_UPDATED, payload: score});
    dispatch({type: SessionActionTypes.FETCHED_PLAYER, payload: player});
};
