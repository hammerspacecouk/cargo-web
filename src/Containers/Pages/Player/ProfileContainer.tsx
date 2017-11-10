import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PlayerActions from "../../../Actions/PlayerActions";
import View from '../../../Views/Pages/Ports/ShowView';
import {Player} from "../../../Domain/Player";
import {StateInterface} from "../../../State/index";

interface RouteParams {
    portId: string;
}

interface Props {
    player: Player;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        PlayerActions.fetchCurrent();
    }

    render() {
        return <View player={this.props.player} />;
    }
}

export default connect(
    (state: StateInterface) => ({
        player: state.player.player
    })
)(Container);
