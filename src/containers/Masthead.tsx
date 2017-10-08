import * as React from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';

import PublicMasthead from '../components/Masthead/PublicMasthead';
import PlayerMasthead from '../components/Masthead/PlayerMasthead';

export default class Masthead extends React.Component<undefined, undefined> {

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
        const isLoggedIn = false;

        if (isLoggedIn) {
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
