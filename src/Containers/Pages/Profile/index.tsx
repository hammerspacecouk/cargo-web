import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import NotFound from "../../../Components/Error/NotFound";
import ProfileContainer from "./ProfileContainer";
import DeleteContainer from "./DeleteContainer";
import {StateInterface} from "../../../State";
import RequireLogin from "../../../Components/RequireLogin";
import Loading from "../../../Components/Loading";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";

interface Props {
    player?: PlayerInterface;
    playerFetched: boolean;
}

class ProfileIndexContainer extends React.Component<Props, undefined> {

    render() {
        // todo - abstract this for reuse
        if (!this.props.player) {
            return this.props.playerFetched ? <RequireLogin /> : <Loading />;
        }

        return (
            <div>
                <Switch>
                    <Route path="/profile/delete" component={DeleteContainer} exact={true} />
                    <Route path="/profile" component={ProfileContainer} exact={true} />
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
)(ProfileIndexContainer);
