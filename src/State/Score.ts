import {Score} from "../Domain/Score";
import {ActionInterface} from "../Actions/ActionInterface";
import ScoreActionTypes from "../Actions/Score/ActionTypes";

export interface ScoreStateInterface extends Score {}

const initialState: ScoreStateInterface = new Score(0, 0, new Date); // todo - use moment, AND a centralised application time;

const adjustScore = (state: ScoreStateInterface, delta: number): ScoreStateInterface => {
    const newScore = state.getValue(new Date);
    return new Score(
        newScore,
        state.changeRate + delta,
        new Date
    );
};

export default (state: ScoreStateInterface = initialState, action: ActionInterface) => {
    switch (action.type) {
        case ScoreActionTypes.INCREASE:
            return adjustScore(state, 1);
        case ScoreActionTypes.DECREASE:
            return adjustScore(state, -1);
        default:
            return state;
    }
};
