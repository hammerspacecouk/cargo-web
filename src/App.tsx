import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Home from './pages/Home/Home';
import Ports from './pages/Ports';

import Error from './pages/Error';

export interface AppProps {}

export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div>
                <nav><ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ports">Ports</Link></li>
                </ul></nav>
                <div>
                    <Switch>
                        <Route path="/ports" component={Ports} />
                        <Route path="/" exact component={Home} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </div>
        )
    }
}
