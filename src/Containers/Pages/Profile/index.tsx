import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import NotFound from "../../../Components/Error/NotFound";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import ProfileContainer from "./ProfileContainer";
import {Player} from "../../../Domain/Player";
import {StateInterface} from "../../../State/index";
import RequireLogin from "../../../Components/RequireLogin";

interface Props {
    player?: Player;
    playerFetched: boolean;
}

class Container extends React.Component<Props, undefined> {

    render() {
        if (!this.props.player) {
            return <RequireLogin loading={!this.props.playerFetched} />
        }

        return (
            <div>
                <BreadCrumbs crumbs={[
                    {link: '/profile', title: 'Profile'},
                ]} />
                <Switch>
                    {/*<Route path="/profile/delete" component={DeleteContainer} exact={true} />*/}
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
)(Container);
