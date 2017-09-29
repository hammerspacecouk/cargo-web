import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import List from './List';
import Show from './Show';

import NotFound from '../../components/Error/NotFound';

export default class Component extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <p style={{color:'red'}}>PORTS</p>
                <Switch>
                    <Route path="/ports" exact component={List} />
                    <Route path="/ports/:portId" exact component={Show} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}
