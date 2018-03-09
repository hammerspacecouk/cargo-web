import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PlayActions from "../../../Actions/Play/Actions";
import * as EditShipActions from  "../../../Actions/EditShip/Actions";
import {StateInterface} from "../../../State";
import {APIClientInterface} from "../../../Data/API";
import Loading from "../../../Components/Loading";
import NotFound from "../../../Components/Error/NotFound";
import ActionTokenInterface from "../../../DomainInterfaces/ActionTokenInterface";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";
import TokenButton from "../../Common/TokenButton";
import CreditsButton from "../../Common/CreditsButton";
import ShipNameContainer from "../../Common/ShipNameContainer";

// todo - this is the same as PlayContainer - how do I share it?
interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: ShipInterface;
    loaded: boolean;

    requestShipNameCost: number;
    requestShipNameToken: ActionTokenInterface;
    requestingShipName: boolean;
    acceptingShipName: boolean;
    offeredShipName?: string;
    offeredShipNameToken?: ActionTokenInterface;

    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class EditContainer extends React.Component<Props, undefined> {
    componentDidMount() {
        if (!this.props.ship || this.props.ship.id !== this.props.match.params.shipId) {
            PlayActions.changeShip(this.props.match.params.shipId, this.props.apiClient, this.props.dispatch);
        }
    }

    render() {
        if (!this.props.ship) {
            return this.props.loaded ? <NotFound message="You be making ship up" /> : <Loading />;
        }

        return (
            <div className="t-doc">
                <div className="t-doc__title">
                    <h1>{this.props.ship.name}</h1>
                </div>
                <div className="t-doc__main">

                    <table className="table table--striped">
                        <tbody>
                        <tr>
                            <th>Class</th>
                            <td>Paddle boat</td>
                        </tr>
                        <tr>
                            <th>Capacity</th>
                            <td>2</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2>Request a new ship name</h2>
                    <p>A new name will be selected at random. You don't have to take it, but no refunds</p>
                    <TokenButton token={this.props.requestShipNameToken}
                                 handler={EditShipActions.requestShipName}
                    >
                        <CreditsButton amount={this.props.requestShipNameCost} disabled={this.props.requestingShipName} />
                    </TokenButton>
                    <ShipNameContainer />
                </div>
            </div>

        );
    }
}


export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,

        ship: state.play.ship,
        loaded: !state.play.fetching,

        requestShipNameToken: state.editShip.requestShipNameToken,
        requestShipNameCost: state.editShip.requestShipNameCost,
        requestingShipName: state.editShip.requestingShipName,
        acceptingShipName: state.editShip.acceptingShipName,
        offeredShipName: state.editShip.offeredShipName,
        offeredShipNameToken: state.editShip.offeredShipNameToken,
    }),
    null
)(EditContainer);
