import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import EditContainer from "./EditContainer";
import PlayContainer from "./PlayContainer";
import WelcomeContainer from "./WelcomeContainer";
import NotFound from "../../../Components/Error/NotFound";
import {StateInterface} from "../../../State";
import RequireLogin from "../../../Components/RequireLogin";
import Loading from "../../../Components/Loading";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";

interface Props {
    player?: PlayerInterface;
    playerFetched: boolean;
}

class Container extends React.Component<Props, undefined> {

    render() {
        // todo - abstract this for reuse
        if (!this.props.player) {
            return this.props.playerFetched ? <RequireLogin /> : <Loading />;
        }

        return (
            <div>
                <Switch>
                    <Route path="/play/:shipId/edit" component={EditContainer} exact={true} />
                    <Route path="/play/:shipId" component={PlayContainer} exact={true} />
                    <Route path="/play" component={WelcomeContainer} exact={true} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface) => ({
        player: state.session.player,
        playerFetched: state.session.playerFetched
    }),
    null
)(Container);
