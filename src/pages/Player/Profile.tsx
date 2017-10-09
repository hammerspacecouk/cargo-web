import * as React from 'react';

import DI from '../../DI';

export default class Home extends React.Component<undefined, undefined> {
    render() {

        // todo - if you're not logged in, this needs to block you

        return (
            <div>
                <h1>Profile</h1>
                <ul>
                    <li><a href={`${DI.apiHostname}/logout`}>Logout</a></li>
                </ul>
            </div>
        )
    }
}
