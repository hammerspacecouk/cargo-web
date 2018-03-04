import * as React from 'react';
import {connect} from 'react-redux';

import {StateInterface} from "../../../State";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";
import PlayerFlag from "../../../Components/PlayerFlag";

interface Props {
    player: PlayerInterface;
    rankStatus: RankStatusInterface;
    apiHostname: string;
}

class Container extends React.Component<Props, undefined> {
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <PlayerFlag player={this.props.player} />

                <h2>Rank</h2>
                <h3>{this.props.rankStatus.currentRank.title}</h3>


                <table>
                    <tbody>
                        <tr>
                            <td>{this.props.rankStatus.currentRank.title}</td>
                            <td style={{minWidth: '400px'}}><div style={{
                                width: '100%',
                                maxWidth: '600px',
                                margin: '16px auto',
                                background: '#666',
                                height: '16px',
                                borderRadius: '64px',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '32px',
                                    background: '#6c6',
                                    width: `${this.props.rankStatus.levelProgress}%`
                                }}/>
                            </div></td>
                            <td>{this.props.rankStatus.nextRank.title}</td>
                        </tr>
                    </tbody>
                </table>


                <h2>Home port</h2>
                <h3>todo</h3>

                <ul>
                    <li><a className="btn" href={`${this.props.apiHostname}/logout`}>Logout</a></li>
                    <li><a className="btn btn--soft-danger" href="/profile/delete">Delete account</a></li>
                </ul>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        player: state.session.player,
        rankStatus: state.session.rankStatus,
        apiHostname: state.environment.apiHostname,
    })
)(Container);

