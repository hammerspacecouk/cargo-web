import * as React from 'react';
import {connect} from 'react-redux';

import {StateInterface} from "../../../State";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";

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
                <p>ID: {this.props.player.id}</p>
                <span style={{
                    display: 'block',
                    height: '40px',
                    width: '100%',
                    backgroundColor: this.props.player.colour
                }} />

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

                <ul>
                    <li><a href={`${this.props.apiHostname}/logout`}>Logout</a></li>
                </ul>
                <h2>Delete account - todo, screens</h2>
                <p>
                    1/3. Are you aware that if you go ahead to the last screen and press the
                    ‘Yes’ button, you will lose all data and your account completely?
                </p>
                <p>
                    2/3. Are you certain you understand that if you proceed and press the ‘Yes’
                    button on the next screen that you will lose your game and it cannot be recovered?
                </p>
                <p>
                    3/3. All data will now be deleted and you will be signed out.
                    Press ‘Yes’ to proceed.
                </p>
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

