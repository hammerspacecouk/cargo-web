import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, withRouter} from 'react-router';
import {parse as parseQueryString} from 'query-string';

import LoginFormContainer from '../Common/LoginFormContainer';

export interface Props {
    mailSent?: boolean
    mailFail?: boolean
}

class Container extends React.Component<Props, undefined> {
    render() {
        return (
            <div className="t-doc">
                <h1 className="t-doc__title">Login</h1>
                <div className="t-doc__main">
                    <LoginFormContainer sent={this.props.mailSent} fail={this.props.mailFail}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state: {}, props: RouteProps) => {
        const query = parseQueryString(props.location.search);
        return {
            mailSent : ("mailsent" in query),
            mailFail : ("mailfail" in query),
        }
    },
    null
)(Container) as any);
