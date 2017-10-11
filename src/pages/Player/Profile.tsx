import * as React from 'react';

import RequireLogin from '../../components/RequireLogin';

import DI from '../../DI';

export default class Home extends React.Component<undefined, undefined> {



    // static requestInitialData(routeParams: Params) {
    //     return DI.models.getPlayer().getProfile(routeParams.portId);
    // }


    render() {
        return (
            <RequireLogin>
                <div>
                    <h1>Profile</h1>
                    <ul>
                        <li><a href={`${DI.apiHostname}/logout`}>Logout</a></li>
                    </ul>
                </div>
            </RequireLogin>
        )
    }
}
