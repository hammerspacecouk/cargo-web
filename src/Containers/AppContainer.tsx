import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter} from 'react-router';
import { Route, Switch } from 'react-router-dom';

import MastheadContainer from "./Common/MastheadContainer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Ports from "./Pages/Ports";
import Profile from "./Pages/Profile";

import NotFound from "../Components/Error/NotFound";

import {refreshSession} from '../Actions/Session/Actions';
import {StateInterface} from "../State/index";
import {APIClientInterface} from "../Data/API/index";

interface Props {
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    private allowUpdate: boolean = false;
    componentWillMount() {
        // todo - only do this on the server if it is not a public page
        refreshSession(this.props.apiClient, this.props.dispatch);
    }

    componentDidMount() {
        this.allowUpdate = true;
        this.updateSession();
    }

    componentWillUnmount() {
        this.allowUpdate = false;
    }

    updateSession() {
        if (!this.allowUpdate) {
            return;
        }

        // todo - store an update time in the session prop and don't bother refetching if it is recent
        refreshSession(this.props.apiClient, this.props.dispatch);
        window.setTimeout(() => this.updateSession(), 1000 * 60);
    }

    render() {
        return (
            <div>
                <MastheadContainer />
                <main><div className="main">
                    <Switch>
                        <Route path="/ports" component={Ports} />
                        <Route path="/profile" component={Profile} />
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

export default withRouter(connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
    }),
    null
)(Container) as any);


