import { combineReducers } from 'redux';
import play, {PlayStateInterface} from './Play';
import ports, {PortsStateInterface} from './Ports';
import session, {SessionStateInterface} from './Session';
import environment, {EnvironmentStateInterface} from './Environment';

export interface StateInterface {
    environment: EnvironmentStateInterface;
    play: PlayStateInterface;
    ports: PortsStateInterface;
    session: SessionStateInterface;
}

// Combine Reducers
export default combineReducers({
    environment,
    play,
    ports,
    session,
});
