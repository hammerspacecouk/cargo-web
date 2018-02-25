import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {StateInterface} from "../../../State";
import ShipInterface, {PLAY_PATH_SHOW} from "../../../DomainInterfaces/ShipInterface";
import {Redirect} from "react-router";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";

interface Props {
    ship: ShipInterface;
    player: PlayerInterface;
    rank: RankStatusInterface;
}

class Container extends React.Component<Props, undefined> {

    renderShip() {
        const flagColour = this.props.player.colour;

        return (
            <div style={{position: "relative"}}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420.41 431.71">
                        <defs>
                            <linearGradient id="a" x1="249.37" x2="249.37" y1="339.67" y2="487.67"
                                            gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#2abaff"/>
                                <stop offset=".19" stopColor="#27b3f6"/>
                                <stop offset=".51" stopColor="#20a0dc"/>
                                <stop offset=".57" stopColor="#1e9cd7"/>
                                <stop offset=".87" stopColor="#0075be"/>
                                <stop offset=".99" stopColor="#005b97"/>
                            </linearGradient>
                        </defs>
                        <g data-name="Layer 2">
                            <path fill="#939393"
                                  d="M184.98 78.89a145.48 145.48 0 0 0-35.64 10.43c-39 17.15-61.73 48.19-91.28 89.55-7.45 10.42-17.64 25.42-28.69 44.33l141.7-1.73c-5.7-7.68-21.95-31.61-21.29-65.64.85-44.4 29.82-71.99 35.2-76.94zm4.35-8.26l-16.49 155.62c18.89-.2 38.62.05 59.12.87 25.62 1 50 2.84 73 5.21a331.76 331.76 0 0 1-34.77-34.77c-5.59-6.48-18.93-22.48-49.55-73-8.1-13.37-18.94-31.69-31.31-53.93z"/>
                            <path fill="#353535"
                                  d="M401.99 291.88c-9.89-14.35-11-22.17-20.32-23.69-1.86-.93-16-.94-15.1-1 6.19-.21-34.12-.24-70.75-1a52.38 52.38 0 0 1-16.51-2.9c-1.7-.61-2.84-1.14-3.14-1.28a50.57 50.57 0 0 1-13.49-9.73c-6.65-7.45-6.19-7.39-23.58-10.54-2.07-.38-59.15-10.64-96.71-11.63-7.43-.2-11.18.08-16.09 1.3-7.48 1.87-10 4.4-17.38 6.09a44.29 44.29 0 0 1-15.65.87l-84.76-9.13c11.33 11.68 24.23 23.81 38.68 36.13 12.41 10.54 24.52 19.92 36.08 28.25 108.67 4.93 222.44 10 331.11 14.89-3.8-4.56-10.7-14.18-12.39-16.63zm-243.52-43.9c-14.22-2.07-24.8-3.46-33-4.35-2-.22-4.94-.52-5.21-1.74-.46-2 6.61-6.26 13.91-6.95a23 23 0 0 1 4.34 0l21.74 1.74zm35.82 4l-32.13-3.47 1.74-11.3 31.3 3.3q-.45 5.71-.91 11.45zm30.47 3l-25.65-2.72 1.2-11.19 25.53 2.98z"/>
                            <path fill={flagColour}
                                  d="M281.95 73.49a84.56 84.56 0 0 1-25.25-.25c-15.2-2.47-21.15-7.84-34.77-10.43-7.14-1.36-18.1-2.27-32.52 1.16q3.21-31.12 6.43-62.26a87.64 87.64 0 0 1 30.44-.66c14.22 2.28 20.31 7.1 35.64 9.56a97.57 97.57 0 0 0 26.43.58q-3.19 31.17-6.4 62.3z"
                                  data-name="Layer 4"/>
                            <path fill="none" stroke="#353535" strokeMiterlimit="10" strokeWidth="4"
                                  d="M196.72.21l-25.22 235.6"/>
                        </g>
                        <path fill="url(#a)"
                              d="M249.33 487.67a237.63 237.63 0 0 0 210.25-126.78c-54.81-13.16-128.66-21.22-209.91-21.22-81.55 0-155.67 8.12-210.51 21.33a237.62 237.62 0 0 0 210.17 126.67z"
                              data-name="Layer 5" transform="translate(-39.16 -55.95)"/>
                    </svg>

                </div>
                <h2 style={{
                    position: "absolute",
                    bottom: "48px",
                    borderRadius: "500px",
                    left: "16px",
                    right: "16px",
                    background: "#ad5825",
                    color: "#ffffff",
                    textAlign: "center",
                    padding: "16px",
                    boxShadow: "1px 1px 5px #000",
                }}>{this.props.ship.name}</h2>
            </div>
        );
    }

    render() {

        if (this.props.rank.portsVisited > 0) {
            return <Redirect to={PLAY_PATH_SHOW(this.props.ship.id)}/>;
        }

        return (
            <div className="t-doc">
                <h1 className="t-doc__title text--center">WELCOME</h1>
                <div className="t-doc__main">
                    <table>
                        <tbody>
                        <tr>
                            <td style={{width: '50%'}}>
                                {this.renderShip()}
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

