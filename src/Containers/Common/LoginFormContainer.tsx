import * as React from 'react';
import {connect} from 'react-redux';

import {StateInterface} from "../../State/index";
import LoginFormComponent from '../../Components/LoginForm';

interface Props {
    apiHostname?: string;
    sent?: boolean;
}

class Container extends React.Component<Props, undefined> {
    // todo - client side submit

    render() {
        return <LoginFormComponent
            loginPathEmail={`${this.props.apiHostname}/login/email`}
            loginPathFacebook={`${this.props.apiHostname}/login/facebook`}
            loginPathGoogle={`${this.props.apiHostname}/login/google`}
            loginPathMicrosoft={`${this.props.apiHostname}/login/microsoft`}
            loginPathTwitter={`${this.props.apiHostname}/login/twitter`}
            emailSent={this.props.sent}
        />
    }
}

export default connect(
    (state: StateInterface) => ({
        apiHostname: state.environment.apiHostname,
    }),
    null
)(Container);

