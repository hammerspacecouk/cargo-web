import SessionActionTypes from './ActionTypes';
import {Dispatch} from "redux";
import {Player} from "../../Domain/Player";
import {Score} from "../../Domain/Score";

export const refreshSession = async (dispatch: Dispatch<any>): Promise<void> => {

    dispatch({type: SessionActionTypes.FETCHING_PLAYER});

    // todo - fetch from server (fake a timeout for now)
    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    await timeout(1000);

    const player = new Player(
        'id-12134',
        new Score(
            10000,
            3,
            new Date('2018-01-04T21:40:00+00:00')
        )
    );

    dispatch({
        type: SessionActionTypes.FETCHED_PLAYER,
        payload: player
    });
};
