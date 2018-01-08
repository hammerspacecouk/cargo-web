import * as React from 'react';
import {connect} from 'react-redux';

import Modal from './ModalContainer';
import GuestMasthead from '../../Components/Masthead/GuestMasthead';
import PlayerMasthead from '../../Components/Masthead/PlayerMasthead';
import {Player} from "../../Domain/Player";
import {StateInterface} from "../../State";
import {Score} from "../../Domain/Score";
import LoginForm from './LoginFormContainer';

interface Props {
    sessionPlayer?: Player;
    sessionScore?: Score;
}

class Container extends React.Component<Props, undefined> {

    constructor(props: Props) {
        super(props);
        this.loginClicked = this.loginClicked.bind(this);
    }

    refs : {
        loginModal: Modal;
    };

    loginClicked(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.refs.loginModal.openModal();
    }

    render() {
        let masthead;
        if (this.props.sessionPlayer) {
            masthead = <PlayerMasthead player={this.props.sessionPlayer}
                                       score={this.props.sessionScore} />;
        } else {
            masthead = [
                <GuestMasthead key="masthead" loginClicked={this.loginClicked} />,
                <Modal key="modal" ref="loginModal" title="Login">
                    <LoginForm />
                </Modal>
            ];
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