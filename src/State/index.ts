import { combineReducers } from 'redux';
import scoreReducer, {ScoreStateInterface} from './Score';
import portsReducer, {PortsStateInterface} from './Ports';

export interface StateInterface {
    score: ScoreStateInterface;
    ports: PortsStateInterface;
}

// Combine Reducers
export default combineReducers({
    score: scoreReducer,
    ports: portsReducer,
});
