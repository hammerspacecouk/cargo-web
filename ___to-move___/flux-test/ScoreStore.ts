import {ReduceStore} from 'flux/utils';

import Dispatcher from './Dispatcher';

interface ScoreState {
    num: number;
}

class ScoreStore extends ReduceStore<ScoreState, any> {
    constructor() {
        super(Dispatcher);
    }

    getInitialState(): ScoreState {
        return {
            num: 1
        };
    }

    getState(): ScoreState {
        return {
            num: 3
        };
    }

    reduce(state: ScoreState, action: any): ScoreState {
        return state;
    }
}

export default new ScoreStore;
