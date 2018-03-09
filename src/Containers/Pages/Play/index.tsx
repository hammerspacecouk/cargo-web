import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router";

import {StateInterface} from "../../../State";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";

import CargoContainer from "./CargoContainer";
import EditContainer from "./EditContainer";
import MapContainer from "./MapContainer";
import PlayContainer from "./PlayContainer";
import PortfolioContainer from "./PortfolioContainer";
import ToolsContainer from "./ToolsContainer";
import WelcomeContainer from "./WelcomeContainer";

import Loading from "../../../Components/Loading";
import NotFound from "../../../Components/Error/NotFound";
import PlayBar from "../../../Components/PlayBar";
import RequireLogin from "../../../Components/RequireLogin";

interface Props {
    player?: PlayerInterface;
    playerFetched: boolean;
    ship?: ShipInterface;
}

class PlayIndexContainer extends React.Component<Props, undefined> {

    render() {
        // todo - abstract this for reuse
        if (!this.props.player) {
            return this.props.playerFetched ? <RequireLogin /> : <Loading />;
        }

        return (
            <div className="t-play">
                <div className="t-play__board">
                <Switch>
                    <Route path="/play/portfolio" component={PortfolioContainer} exact={true} />
                    <Route path="/play/tools" component={ToolsContainer} exact={true} />
                    <Route path="/play/:shipId/cargo" component={CargoContainer} exact={true} />
                    <Route path="/play/:shipId/map" component={MapContainer} exact={true} />
                    <Route path="/play/:shipId/edit" component={EditContainer} exact={true} />
                    <Route path="/play/:shipId" component={PlayContainer} exact={true} />
                    <Route path="/play" component={WelcomeContainer} exact={true} />
                    <Route component={NotFound} />
                </Switch>
                </div>
                <div className="t-play__navigation">
                    <PlayBar ship={this.props.ship} />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface) => ({
        player: state.session.player,
        playerFetched: state.session.playerFetched,
        ship: state.play.ship,
    }),
    null
)(PlayIndexContainer);
