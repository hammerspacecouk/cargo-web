import * as React from 'react';

import LoginFormComponent from '../components/LoginForm';

export interface Props {
    sent : boolean
}

export default class LoginForm extends React.Component<Props, undefined> {
    // todo - client side submit

    render() {
        // todo - inject environment/API URL manager

        return <LoginFormComponent
            loginPathEmail="//api.dev.planetcargo.live/login/email"
            loginPathFacebook="//api.dev.planetcargo.live/login/facebook"
            loginPathGoogle="//api.dev.planetcargo.live/login/google"
            loginPathTwitter="//api.dev.planetcargo.live/login/twitter"
            emailSent={this.props.sent}
        />
    }
}
