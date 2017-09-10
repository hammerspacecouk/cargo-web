import * as React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Home from './containers/Home/Home';
import Ports from './containers/Ports';

import NotFound from './components/Error/NotFound';

export interface AppProps {
    name: string;
}

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
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}
