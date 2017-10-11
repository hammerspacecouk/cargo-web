import * as React from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';

import PublicMasthead from '../components/Masthead/PublicMasthead';
import PlayerMasthead from '../components/Masthead/PlayerMasthead';

interface State {
    loggedIn: boolean;
}

export default class Masthead extends React.Component<undefined, State> {

    constructor() {
        super();
        this.loginClicked = this.loginClicked.bind(this);
        this.state = {
            loggedIn: false
        }
    }

    refs : {
        loginModal: Modal;
    };

    loginClicked(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.refs.loginModal.openModal();
    }

    render() {
        if (this.state.loggedIn) {
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
