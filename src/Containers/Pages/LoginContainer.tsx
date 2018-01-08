import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, withRouter} from 'react-router';
import {parse as parseQueryString} from 'query-string';

import LoginFormContainer from '../Common/LoginFormContainer';

export interface Props {
    mailSent?: boolean
}

class Container extends React.Component<Props, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>Login</h1>
                    <LoginFormContainer sent={this.props.mailSent}/>
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
        }
    },
    null
)(Container) as any);
