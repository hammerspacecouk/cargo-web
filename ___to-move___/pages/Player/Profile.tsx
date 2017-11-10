import * as React from 'react';

import RequireLogin from '../../components/RequireLogin';

import DI, {Services} from '../../DI';
import {UserInterface} from "../../models/User";

interface Props {
    staticContext: {
        user?: UserInterface;
    };
}

interface State {
    user?: UserInterface;
}

export default class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super();

        let user: UserInterface;
        if (props.staticContext && props.staticContext.user !== undefined) {
            user = props.staticContext.user;
        }

        this.state = { user };
    }

    async componentDidMount() {
        if (!this.state.user) {
            this.setState({
                user: await Services.user.init()
            });
        }
    }

    render() {
        let profileContainer = null;
        if (this.state.user) {
            profileContainer = (
                <div>
                    <h1>Profile</h1>
                    <p>ID: {this.state.user.id}</p>
                    <ul>
                        <li><a href={`${DI.apiHostname}/logout`}>Logout</a></li>
                    </ul>
                    <h2>Delete account - todo, screens</h2>
                    <p>
                        1/3. Are you aware that if you go ahead to the last screen and press the
                        ‘Yes’ button, you will lose all data and your account completely?
                    </p>
                    <p>
                        2/3. Are you certain you understand that if you proceed and press the ‘Yes’
                        button on the next screen that you will lose your game and it cannot be recovered?
                    </p>
                    <p>
                        3/3. All data will now be deleted and you will be signed out.
                        Press ‘Yes’ to proceed.
                    </p>
                </div>
            );
        }

        return (
            <RequireLogin loading={this.state.user === undefined}>
                {profileContainer}
            </RequireLogin>
        )
    }
}
