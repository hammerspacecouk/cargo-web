import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Services } from './DI';
import { UserInterface } from './models/User';

import routes from './routes';

import Masthead from './containers/Masthead';

interface Props {
    user?: UserInterface;
}

interface State {
    user?: UserInterface;
}

export default class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super();
        this.state = {
            user: props.user || null
        }
    }

    async componentDidMount() {
        if (!this.state.user) {
            this.setState({
                user: await Services.user.init()
            });
            // todo - recheck the User information regularly (every 2 mins?)
        }
    }

    render() {
        return (
            <div>
                <Masthead user={this.state.user} />
                <div>
                    <Switch>
                        {routes.map((route: object, i: number) => <Route key={i} {...route} />)}
                    </Switch>
                </div>
            </div>
        )
    }
}
