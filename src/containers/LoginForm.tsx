import * as React from 'react';

import LoginFormComponent from '../components/LoginForm';

export interface Props {
    sent : boolean
}

export default class LoginForm extends React.Component<Props, undefined> {
    // todo - client side submit

    render() {
        // todo - inject environment/API URL manager
        const loginPathGoogle: string = '//api.dev.planetcargo.live/login/google';
        const loginPathEmail: string = '//api.dev.planetcargo.live/login/email';

        return <LoginFormComponent
            loginPathGoogle={loginPathGoogle}
            loginPathEmail={loginPathEmail}
            emailSent={this.props.sent}
        />
    }
}
