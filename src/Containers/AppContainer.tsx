import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter} from 'react-router';
import { Route, Switch } from 'react-router-dom';

import MastheadContainer from "./Common/MastheadContainer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Ports from "./Pages/Ports";

import NotFound from "../Components/Error/NotFound";

import {refreshSession} from '../Actions/Session/Actions';

interface Props {
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {
    componentWillMount() {
        refreshSession(this.props.dispatch);
    }

    render() {
        return (
            <div>
                <MastheadContainer />
                <main><div className="main">
                    <Switch>
                        <Route path="/ports" component={Ports} />
                        <Route path="/about" component={About} />

                        {/*<Route path="/login" component={Login} />*/}
                        <Route path="/" component={Home} exact={true} />

                        <Route component={NotFound} />
                    </Switch>
                </div></main>
            </div>
        );
    }
}

export default withRouter(connect()(Container) as any);
