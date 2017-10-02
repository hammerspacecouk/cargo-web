import * as React from 'react';
import LoginForm from '../../containers/LoginForm';

import DI from '../../DI';

import QueryString from '../../helpers/QueryString';

export interface Props {
    location : {
        search?: string
    }
}

export default class Home extends React.Component<Props, undefined> {
    render() {
        const queryString = new QueryString(this.props.location.search);

        // todo - login form is just a link to "play" if you're logged in (might only do that on client so it can be cached)
        return (
            <div>
                <h1>HOME</h1>
                <div>
                    <img src={DI.getAssets().get('placeholder-logo.png')} alt="Test Logo" />
                </div>
                <LoginForm sent={queryString.hasParam('mailsent')}/>
            </div>
        )
    }
}
