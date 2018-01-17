import {ActionInterface} from "../Actions/ActionInterface";
import SessionActionTypes from "../Actions/Session/ActionTypes";
import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";

export interface SessionStateInterface {
    player?: PlayerInterface;
    score?: ScoreInterface;
    ships?: ShipInterface[];
    loginToken? : string;
    playerFetched: boolean;
    playerFetching: boolean;
}

const initialState: SessionStateInterface = {
    player: null,
    score: null,
    ships: null,
    loginToken: null,
    playerFetched: false,
    playerFetching: false
};

export default (state: SessionStateInterface = initialState, action: ActionInterface) => {
    const newState: SessionStateInterface = Object.assign({}, state);
    switch (action.type) {
        case SessionActionTypes.FETCHED_GUEST:
            newState.loginToken = action.payload;
            newState.player = null;
            newState.playerFetching = false;
            newState.playerFetched = true;
            return newState;
        case SessionActionTypes.FETCHED_PLAYER:
            newState.player = action.payload;
            newState.playerFetching = false;
            newState.playerFetched = true;
            return newState;
        case SessionActionTypes.FETCHING_PLAYER:
            newState.playerFetching = true;
            return newState;
        case SessionActionTypes.SCORE_UPDATED:
            newState.score = action.payload;
            return newState;
        case SessionActionTypes.SHIPS_UPDATED:
            newState.ships = action.payload;
            return newState;
        default:
            return state;
    }
};
