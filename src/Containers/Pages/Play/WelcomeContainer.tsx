import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {StateInterface} from "../../../State";
import ShipInterface, {PLAY_PATH_SHOW} from "../../../DomainInterfaces/ShipInterface";
import {Redirect} from "react-router";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import PlayerFlag from "../../../Components/PlayerFlag";

interface Props {
    ship: ShipInterface;
    player: PlayerInterface;
    rank: RankStatusInterface;
}

class Container extends React.Component<Props, undefined> {

    render() {

        if (this.props.rank.portsVisited > 0) {
            return <Redirect to={PLAY_PATH_SHOW(this.props.ship.id)} />;
        }

        return (
            <div className="t-doc">
                <h1 className="t-doc__title text--center">WELCOME</h1>
                <div className="t-doc__main">
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width:'50%'}}>
                                    <PlayerFlag player={this.props.player} />
                                    <h2>{this.props.ship.name}</h2>
                                </td>
                                <td className="text--prose">
                                    <p>
                                        This is your first ship. It can carry 2 crates.
                                        It will be placed in a safe port where you can
                                        pick up some cargo to transport.
                                    </p>
                                    <p className="text--center">
                                        <Link to={PLAY_PATH_SHOW(this.props.ship.id)}
                                              className="btn">Begin</Link>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        ship: state.session.ships[0],
        rank: state.session.rankStatus,
        player: state.session.player,
    })
)(Container);

