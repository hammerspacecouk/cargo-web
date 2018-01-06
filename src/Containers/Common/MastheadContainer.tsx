import * as React from 'react';
import {connect} from 'react-redux';

import GuestMasthead from '../../Components/Masthead/GuestMasthead';
import PlayerMasthead from '../../Components/Masthead/PlayerMasthead';
import {Player} from "../../Domain/Player";
import {StateInterface} from "../../State";
import {Score} from "../../Domain/Score";

interface Props {
    sessionPlayer?: Player;
    sessionScore?: Score;
}

class Container extends React.Component<Props, undefined> {
    render() {
        let masthead;
        if (this.props.sessionPlayer) {
            masthead = <PlayerMasthead player={this.props.sessionPlayer}
                                       score={this.props.sessionScore} />;
        } else {
            masthead = <GuestMasthead />
        }

        return (<header>{masthead}</header>);
    }
}

export default connect(
    (state: StateInterface) => ({
        sessionPlayer: state.session.player,
        sessionScore: state.session.score,
    }),
    null
)(Container);