import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, withRouter} from 'react-router';
import {parse as parseQueryString} from 'query-string';
import TokenButton from "../Common/TokenButton";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";

export interface Props {
    token?: string
}

class Container extends React.Component<Props, undefined> {
    render() {
        const token: ActionTokenInterface = {
            path: '/login/email', // todo - needs api hostname
            token: this.props.token
        };

        return (
            <div className="t-doc">
                <h1 className="t-doc__title">Login using e-mail</h1>
                <div className="t-doc__main">
                    <p>
                        Thank you for clicking the link in your e-mail.
                        If you didn't mean to, don't worry; Nothing has happened yet.
                        To perform the login and continue to your game click below.
                    </p>
                    <TokenButton token={token}>
                        <button className="btn btn--confirm">Continue</button>
                    </TokenButton>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state: {}, props: RouteProps) => {
        const query = parseQueryString(props.location.search);
        return {
            token : query.token,
        }
    },
    null
)(Container) as any);
