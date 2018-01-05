import {ActionInterface} from "../Actions/ActionInterface";
import SessionActionTypes from "../Actions/Session/ActionTypes";
import {Player} from "../Domain/Player";

export interface SessionStateInterface {
    player?: Player;
    playerFetched: boolean;
    playerFetching: boolean;
}

const initialState: SessionStateInterface = {
    player: null,
    playerFetched: false,
    playerFetching: false
};

export default (state: SessionStateInterface = initialState, action: ActionInterface) => {
    const newState: SessionStateInterface = Object.assign({}, state);
    switch (action.type) {
        case SessionActionTypes.FETCHING_PLAYER:
            newState.playerFetching = true;
            return newState;
        case SessionActionTypes.FETCHED_PLAYER:
            newState.player = action.payload;
            newState.playerFetching = false;
            newState.playerFetched = true;
            return newState;
        default:
            return state;
    }
};
