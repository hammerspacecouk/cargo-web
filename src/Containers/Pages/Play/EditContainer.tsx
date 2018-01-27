import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PlayActions from "../../../Actions/Play/Actions";
import * as EditShipActions from  "../../../Actions/EditShip/Actions";
import EditShipActionTypes from  "../../../Actions/EditShip/ActionTypes";
import {StateInterface} from "../../../State/index";
import {APIClientInterface} from "../../../Data/API/index";
import Loading from "../../../Components/Loading";
import NotFound from "../../../Components/Error/NotFound";
import ActionTokenInterface from "../../../DomainInterfaces/ActionTokenInterface";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";
import TokenButton from "../../Common/TokenButton";

// todo - this is the same as PlayContainer - how do I share it?
interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: ShipInterface;
    loaded: boolean;

    requestShipNameToken: ActionTokenInterface;
    requestingShipName: boolean;
    acceptingShipName: boolean;
    offeredShipName?: string;
    offeredShipNameToken?: ActionTokenInterface;

    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        if (!this.props.ship || this.props.ship.id !== this.props.match.params.shipId) {
            PlayActions.fetchShip(this.props.match.params.shipId, this.props.apiClient, this.props.dispatch);
        }
    }

    rejectNameOffer(e: Event) {
        e.preventDefault();
        this.props.dispatch({type: EditShipActionTypes.REJECT_SHIP_NAME_OFFER});
    }

    render() {
        if (!this.props.ship) {
            return this.props.loaded ? <NotFound message="You be making ship up" /> : <Loading />;
        }

        // todo - break out components
        let name = null;
        if (this.props.offeredShipName) {
            name = (
                <TokenButton token={this.props.offeredShipNameToken}
                             handler={EditShipActions.acceptShipName}>
                    <h3>Name offered: {this.props.offeredShipName}</h3>
                    <a href="." className="btn btn--soft-danger" onClick={this.rejectNameOffer.bind(this)}>Reject</a>
                    <button className="btn btn--confirm" type="submit">Accept</button>
                </TokenButton>
            );
        } else if (this.props.acceptingShipName) {
            name = (<h3>Updating</h3>);
        }

        // todo - fancy animation to hide loading (look like its decrypting words on the fly)
        // todo - use the form fields?
        // todo also - this should be a POST
        // todo - disable the button while in progress


        // todo - real values obviously
        return (
            <div className="t-doc">
                <h1 className="t-doc__title">
                    {this.props.ship.name}
                </h1>
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
                        <button className="btn" type="submit" disabled={this.props.requestingShipName}>500 credits</button>
                    </TokenButton>
                    {name}

                    <h2>Upgrade ship</h2>
                    <p>Upgrade to a [X]: capacity [X]</p>
                    <form>
                        <button className="btn" type="submit">500 credits</button>
                    </form>
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
        requestingShipName: state.editShip.requestingShipName,
        acceptingShipName: state.editShip.acceptingShipName,
        offeredShipName: state.editShip.offeredShipName,
        offeredShipNameToken: state.editShip.offeredShipNameToken,
    }),
    null
)(Container);
