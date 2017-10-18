import * as React from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import {UserInterface} from "../models/User";

import PublicMasthead from '../components/Masthead/PublicMasthead';
import PlayerMasthead from '../components/Masthead/PlayerMasthead';

interface Props {
    user?: UserInterface;
}

export default class Masthead extends React.Component<Props, undefined> {

    constructor() {
        super();
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
        const loggedIn = !!this.props.user;

        if (loggedIn) {
            return (
                <div>
                    <PlayerMasthead />
                </div>
            );
        }

        return (
            <div>
                <PublicMasthead loginClicked={this.loginClicked} />
                <Modal ref="loginModal" title="Login">
                    <LoginForm sent={false} />
                </Modal>
            </div>
        );
    }
}
