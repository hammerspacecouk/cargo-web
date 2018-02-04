import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {Link} from "react-router-dom";

import * as PlayActions from "../../../Actions/Play/Actions";
import {StateInterface} from "../../../State/index";
import {APIClientInterface} from "../../../Data/API/index";
import PortContainer from "../../Common/Play/PortContainer";
import TravellingContainer from "../../Common/Play/TravellingContainer";
import Loading from "../../../Components/Loading";
import NotFound from "../../../Components/Error/NotFound";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";

interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: ShipInterface;
    loaded: boolean;
    isInPort: boolean;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        if (!this.props.ship || this.props.ship.id !== this.props.match.params.shipId) {
            PlayActions.fetchShip(this.props.match.params.shipId, this.props.apiClient, this.props.dispatch);
        }
    }

    render() {
        if (!this.props.ship) {
            return this.props.loaded ? <NotFound message="You be making ship up" /> : <Loading />;
        }

        let main = null;
        if (this.props.isInPort) {
            main = <PortContainer />
        } else {
            main = <TravellingContainer/>
        }

        return (
            <main>
                <h1>
                    {this.props.ship.name} (<Link to={`/play/${this.props.ship.id}/edit`}>edit</Link>)
                </h1>
                {main}
            </main>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ship: state.play.ship,
        loaded: !state.play.fetching,
        isInPort: !!state.play.currentPort,
    })
)(Container);
