import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {StateInterface} from "../../../State";
import {APIClientInterface} from "../../../Data/API";
import ShipInterface, {PLAY_PATH_SHOW} from "../../../DomainInterfaces/ShipInterface";
import {Redirect} from "react-router";

interface Props {
    ships: ShipInterface[];
    currentShip: ShipInterface;
    apiClient: APIClientInterface;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    redirectToShip(ships: ShipInterface[]) {
        // just pick the first ship for now - todo - choose based on which one is docked
        const shipId = ships[0].id;
        return <Redirect to={PLAY_PATH_SHOW(shipId)} />;
    }

    render() {

        if (this.props.ships.length) {
            return this.redirectToShip(this.props.ships);
        }

        // todo - obviously
        return (<h1>WELCOME</h1>);
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ships: state.session.ships,
    })
)(Container);

