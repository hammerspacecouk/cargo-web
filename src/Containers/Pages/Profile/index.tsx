import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import NotFound from "../../../Components/Error/NotFound";
import BreadCrumbs from "../../../Components/BreadCrumbs";
import ProfileContainer from "./ProfileContainer";
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
