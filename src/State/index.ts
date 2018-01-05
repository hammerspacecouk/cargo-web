import { combineReducers } from 'redux';
import scoreReducer, {ScoreStateInterface} from './Score';
import portsReducer, {PortsStateInterface} from './Ports';
import sessionReducer, {SessionStateInterface} from './Session';

export interface StateInterface {
    // ports: PortsStateInterface;
    session: SessionStateInterface;
}

// Combine Reducers
export default combineReducers({
    session: sessionReducer,
    // ports: portsReducer,
});
