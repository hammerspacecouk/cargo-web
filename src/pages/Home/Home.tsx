import * as React from 'react';
import LoginForm from '../../containers/LoginForm';
import { Link } from 'react-router-dom';

import DI from '../../DI';

export default class Home extends React.Component<undefined, undefined> {
    render() {

        let loginPanel = (
            <div>
                <h2>Login</h2>
                <LoginForm />
            </div>
        );
        if (DI.isLoggedIn()) {
            loginPanel = (
                <div>
                    <Link to="/play">Play</Link>
                </div>
            );
        }

        // todo - login form is just a link to "play" if you're logged in (might only do that on client so it can be cached)
        return (
            <div>
                <h1>HOME</h1>
                <div>
                    <h1>Welcome welcome welcome</h1>
                </div>
                {loginPanel}
            </div>
        )
    }
}
