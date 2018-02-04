import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import * as PlayActions from "../../../Actions/Play/Actions";
import {StateInterface} from "../../../State/index";
import {APIClientInterface} from "../../../Data/API/index";
import PortInterface from "../../../DomainInterfaces/PortInterface";
import DirectionsInterface from "../../../DomainInterfaces/DirectionsInterface";
import DirectionInterface from "../../../DomainInterfaces/DirectionInterface";
import TokenButton from "../../Common/TokenButton";

interface Props {
    readonly port: PortInterface;
    readonly directions: DirectionsInterface;
    readonly dispatch: Dispatch<any>;
    readonly apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {

    renderDirection(direction?: DirectionInterface) {
        if (!direction) {
            return null;
        }

        return (
            <div>
                <h3>{direction.destination.name}</h3>
                <TokenButton token={direction.action}
                             handler={PlayActions.moveShip}
                >
                    <button className="btn" type="submit">Go ({direction.distanceUnit})</button>
                </TokenButton>
            </div>
        );
    }

    // todo - break out into components
    render() {
        return (
            <div>
                <h1>{this.props.port.name}</h1>

                <table style={{"minWidth" : "400px"}}><tbody>
                    <tr>
                        <td>
                            <h2>NW</h2>
                            {this.renderDirection(this.props.directions.NW)}
                        </td>
                        <td>
                            <h2>NE</h2>
                            {this.renderDirection(this.props.directions.NE)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>W</h2>
                            {this.renderDirection(this.props.directions.W)}
                        </td>
                        <td>
                            <h2>E</h2>
                            {this.renderDirection(this.props.directions.E)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h2>SE</h2>
                            {this.renderDirection(this.props.directions.SE)}
                        </td>
                        <td>
                            <h2>SW</h2>
                            {this.renderDirection(this.props.directions.SW)}
                        </td>
                    </tr>
                </tbody></table>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        port: state.play.currentPort,
        directions: state.play.directions,
    })
)(Container);