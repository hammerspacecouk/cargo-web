import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter} from 'react-router';
import { Route, Switch } from 'react-router-dom';

import MastheadContainer from "./Common/MastheadContainer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Play from "./Pages/Play";import Ports from "./Pages/Ports";
import Profile from "./Pages/Profile";
import Login from "./Pages/LoginContainer";
import LoginEmail from "./Pages/LoginEmailContainer";

import NotFound from "../Components/Error/NotFound";

import {refreshSession} from '../Actions/Session/Actions';
import {StateInterface} from "../State";
import {APIClientInterface} from "../Data/API";

interface Props {
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    private sessionRefreshTime: number = 1000 * 60 * 2;
    private allowUpdate: boolean = false;
    componentWillMount() {
    }

    componentDidMount() {
        this.allowUpdate = true;
        refreshSession(this.props.apiClient, this.props.dispatch); // todo - allow this on the server on private pages
        window.setTimeout(() => this.updateSession(), this.sessionRefreshTime);
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
        window.setTimeout(() => this.updateSession(), this.sessionRefreshTime);
    }

    render() {
        return (
            <div>
                <MastheadContainer />
                <main><div className="main">
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/play" component={Play} />
                        <Route path="/ports" component={Ports} />
                        <Route path="/profile" component={Profile} />

                        <Route path="/login/email" component={LoginEmail} exact={true} />
                        <Route path="/login" component={Login} exact={true} />
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


