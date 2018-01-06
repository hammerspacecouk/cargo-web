import {ActionInterface} from "../Actions/ActionInterface";
import SessionActionTypes from "../Actions/Session/ActionTypes";
import {Player} from "../Domain/Player";
import {Score} from "../Domain/Score";

export interface SessionStateInterface {
    player?: Player;
    score?: Score;
    playerFetched: boolean;
    playerFetching: boolean;
}

const initialState: SessionStateInterface = {
    player: null,
    score: null,
    playerFetched: false,
    playerFetching: false
};

export default (state: SessionStateInterface = initialState, action: ActionInterface) => {
    const newState: SessionStateInterface = Object.assign({}, state);
    switch (action.type) {
        case SessionActionTypes.FETCHING_PLAYER:
            newState.playerFetching = true;
            return newState;
        case SessionActionTypes.FETCHED_GUEST:
            newState.player = null;
            newState.playerFetching = false;
            newState.playerFetched = true;
            return newState;
        case SessionActionTypes.FETCHED_PLAYER:
            newState.player = action.payload;
            newState.playerFetching = false;
            newState.playerFetched = true;
            return newState;
        case SessionActionTypes.SCORE_UPDATED:
            newState.score = action.payload;
            return newState;
        default:
            return state;
    }
};
