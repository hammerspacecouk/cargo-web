import * as React from 'react';
import {connect} from 'react-redux';
import * as PlayActions from "../../../Actions/Play/Actions";
import {StateInterface} from "../../../State";
import PortInterface from "../../../DomainInterfaces/PortInterface";
import DirectionsInterface from "../../../DomainInterfaces/DirectionsInterface";
import DirectionInterface from "../../../DomainInterfaces/DirectionInterface";
import TokenButton from "../../Common/TokenButton";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";
import PlayerFlag from "../../../Components/PlayerFlag";
import ScoreContainer from "../ScoreContainer";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";
import ShipList from "../../../Components/ShipList";

interface Props {
    readonly port: PortInterface;
    readonly playerRankStatus: RankStatusInterface;
    readonly directions: DirectionsInterface;
    readonly departingPort: boolean;
    readonly shipsInLocation: ShipInterface[];
}

class PortContainer extends React.Component<Props, undefined> {

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
        if (this.props.departingPort) {
            return (
                <div>
                    <h1>{this.props.port.name}</h1>
                    <p>Departing...</p>
                </div>
            );
        }

        let welcome = null;
        if (this.props.playerRankStatus.portsVisited === 0) {
            welcome = (
                <div className="text--prose">
                <p>
                    Welcome to {this.props.port.name}. It is a <strong>Safe Haven</strong>.
                    It costs you nothing to be here and your ship cannot be harmed while it is here.
                </p>
                <p>
                    This is your home port. Should you run out of time on the high seas,
                    your ships will be returned to here
                </p>
                </div>
            );
        }

        let players: React.ReactElement<HTMLLIElement>[] = [];
        this.props.shipsInLocation.forEach((ship: ShipInterface) => {
           players.push(
                <li key={ship.id} className="player-list">
                    <h4><PlayerFlag player={ship.owner} />{ship.name}</h4>
                    <ScoreContainer score={ship.owner.score} />
                </li>
           );
        });

        return (
            <div>
                <h1>{this.props.port.name}</h1>
                {welcome}
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
                            <h2>SW</h2>
                            {this.renderDirection(this.props.directions.SW)}
                        </td>
                        <td>
                            <h2>SE</h2>
                            {this.renderDirection(this.props.directions.SE)}
                        </td>
                    </tr>
                </tbody></table>

                <h2>Players</h2>
                <ShipList ships={this.props.shipsInLocation} />
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        port: state.play.currentPort,
        playerRankStatus: state.session.rankStatus,
        directions: state.play.directions,
        departingPort: state.play.departingPort,
        shipsInLocation: state.play.shipsInLocation
    })
)(PortContainer);