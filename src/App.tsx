import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import DI from './DI';

import routes from './routes';

export default class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <div>
                    <img src={DI.getAssets().get('placeholder-logo.png')} alt="Test Logo" />
                </div>
                <nav><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ports">Ports</Link></li>
                </ul></nav>
                <div>
                    <Switch>
                        {routes.map((route: object, i: number) => <Route key={i} {...route} />)}
                    </Switch>
                </div>
            </div>
        )
    }
}
