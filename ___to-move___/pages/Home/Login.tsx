import * as React from 'react';
import LoginForm from '../../containers/LoginForm';

import QueryString from '../../../src/Models/Helpers/QueryString';

export interface Props {
    location : {
        search?: string
    }
}

export default class Login extends React.Component<Props, undefined> {
    render() {
        const queryString = new QueryString(this.props.location.search);

        return (
            <div>
                <h1>Login</h1>
                <LoginForm sent={queryString.hasParam('mailsent')} />
            </div>
        )
    }
}
