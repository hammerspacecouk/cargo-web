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
