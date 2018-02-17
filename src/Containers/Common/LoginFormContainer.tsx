import * as React from 'react';
import {connect} from 'react-redux';

import {StateInterface} from "../../State";
import LoginFormComponent from '../../Components/LoginForm';
import MessageInterface from "../../DomainInterfaces/MessageInterface";

interface Props {
    apiHostname?: string;
    messages?: MessageInterface[];
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
            messages={this.props.messages}
        />
    }
}

export default connect(
    (state: StateInterface) => ({
        apiHostname: state.environment.apiHostname,
    }),
    null
)(Container);

