import ScoreActionTypes from './ScoreActionTypes';
import {Dispatch} from "redux";

export const increase = (dispatch: Dispatch<any>): void => {
    dispatch({
        type: ScoreActionTypes.INCREASE
    });
};

export const decrease = (dispatch: Dispatch<any>): void => {
    dispatch({
        type: ScoreActionTypes.DECREASE
    });
};
