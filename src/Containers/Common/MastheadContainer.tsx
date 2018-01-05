import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import GuestMasthead from '../../Components/Masthead/GuestMasthead';
import PlayerMasthead from '../../Components/Masthead/PlayerMasthead';
import {Player} from "../../Domain/Player";
import {StateInterface} from "../../State";

interface Props {
    sessionPlayer?: Player;
}

class Container extends React.Component<Props, undefined> {
    render() {
        let masthead;
        if (this.props.sessionPlayer) {
            masthead = <PlayerMasthead player={this.props.sessionPlayer} />;
        } else {
            masthead = <GuestMasthead />
        }

        return (<header>{masthead}</header>);
    }
}

export default withRouter(connect(
    (state: StateInterface) => ({
        sessionPlayer: state.session.player
    }),
    null
)(Container) as any);