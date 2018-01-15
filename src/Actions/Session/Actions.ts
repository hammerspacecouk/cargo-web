import SessionActionTypes from './ActionTypes';
import {Dispatch} from "redux";
import {Player} from "../../Domain/Player";
import {Score} from "../../Domain/Score";
import {APIClientInterface} from "../../Data/API/index";
import {Ship} from "../../Domain/Ship";

export const refreshSession = async (apiClient: APIClientInterface, dispatch: Dispatch<any>): Promise<void> => {

    dispatch({type: SessionActionTypes.FETCHING_PLAYER});

    const data = await apiClient.fetch('/login/check');
    if (data.loggedIn) {
        const player = new Player(data.player.id);
        const score = new Score(data.player.score.value, data.player.score.rate, new Date(data.player.score.datetime));
        const ships = data.player.ships.map((ship: any) => new Ship(
            ship.id,
            ship.name
        ));

        dispatch({type: SessionActionTypes.SCORE_UPDATED, payload: score});
        dispatch({type: SessionActionTypes.SHIPS_UPDATED, payload: ships});
        dispatch({type: SessionActionTypes.FETCHED_PLAYER, payload: player});
        return;
    }

    dispatch({type: SessionActionTypes.FETCHED_GUEST, payload: data.loginToken});
};
