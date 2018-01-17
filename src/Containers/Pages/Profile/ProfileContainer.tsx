import * as React from 'react';
import {connect} from 'react-redux';

import {StateInterface} from "../../../State/index";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";

interface Props {
    player: PlayerInterface;
    apiHostname: string;
}

class Container extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <p>ID: {this.props.player.id}</p>
                <ul>
                    <li><a href={`${this.props.apiHostname}/logout`}>Logout</a></li>
                </ul>
                <h2>Delete account - todo, screens</h2>
                <p>
                    1/3. Are you aware that if you go ahead to the last screen and press the
                    ‘Yes’ button, you will lose all data and your account completely?
                </p>
                <p>
                    2/3. Are you certain you understand that if you proceed and press the ‘Yes’
                    button on the next screen that you will lose your game and it cannot be recovered?
                </p>
                <p>
                    3/3. All data will now be deleted and you will be signed out.
                    Press ‘Yes’ to proceed.
                </p>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        player: state.session.player,
        apiHostname: state.environment.apiHostname,
    })
)(Container);

