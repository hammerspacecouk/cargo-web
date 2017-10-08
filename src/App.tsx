import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routes';

import Masthead from './containers/Masthead';

export default class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <Masthead />
                <div>
                    <Switch>
                        {routes.map((route: object, i: number) => <Route key={i} {...route} />)}
                    </Switch>
                </div>
            </div>
        )
    }
}
