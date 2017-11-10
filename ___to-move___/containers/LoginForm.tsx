import * as React from 'react';

import LoginFormComponent from '../components/LoginForm';

import DI from '../DI';

export interface Props {
    sent? : boolean
}

export default class LoginForm extends React.Component<Props, undefined> {
    // todo - client side submit

    render() {
        return <LoginFormComponent
            loginPathEmail={`${DI.apiHostname}/login/email`}
            loginPathFacebook={`${DI.apiHostname}/login/facebook`}
            loginPathGoogle={`${DI.apiHostname}/login/google`}
            loginPathMicrosoft={`${DI.apiHostname}/login/microsoft`}
            loginPathTwitter={`${DI.apiHostname}/login/twitter`}
            emailSent={this.props.sent}
        />
    }
}
