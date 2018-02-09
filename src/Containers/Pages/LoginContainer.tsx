import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, withRouter} from 'react-router';

import LoginFormContainer from '../Common/LoginFormContainer';
import MessageInterface from "../../DomainInterfaces/MessageInterface";

import messageQueryString from '../../Helpers/MessageQueryString';

export interface Props {
    messages?: MessageInterface[];
}

class Container extends React.Component<Props, undefined> {
    render() {
        return (
            <div className="t-doc">
                <h1 className="t-doc__title">Login</h1>
                <div className="t-doc__main">
                    <LoginFormContainer messages={this.props.messages}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state: {}, props: RouteProps) => {
        return {
            messages: messageQueryString(props.location.search),
        }
    },
    null
)(Container) as any);
