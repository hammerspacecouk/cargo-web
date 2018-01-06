import { combineReducers } from 'redux';
import ports, {PortsStateInterface} from './Ports';
import session, {SessionStateInterface} from './Session';
import environment, {EnvironmentStateInterface} from './Environment';

export interface StateInterface {
    ports: PortsStateInterface;
    environment: EnvironmentStateInterface;
    session: SessionStateInterface;
}

// Combine Reducers
export default combineReducers({
    environment,
    session,
    ports,
});
