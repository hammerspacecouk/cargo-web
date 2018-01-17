import * as React from 'react';
import {connect} from 'react-redux';

import Modal from './ModalContainer';
import GuestMasthead from '../../Components/Masthead/GuestMasthead';
import PlayerMasthead from '../../Components/Masthead/PlayerMasthead';
import {StateInterface} from "../../State";
import LoginForm from './LoginFormContainer';
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";

interface Props {
    sessionPlayer?: PlayerInterface;
    sessionScore?: ScoreInterface;
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