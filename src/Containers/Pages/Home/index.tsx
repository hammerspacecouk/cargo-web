import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import {PATH_LIST as portsPath} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";
import {Player} from "../../../Domain/Player";
import LoginForm from "../../Common/LoginFormContainer";

interface Props {
    sessionPlayer?: Player,
    sessionChecked: boolean
}

class Container extends React.Component<Props, undefined> {
    render() {
        let playPanel = <Link to="/play">Go to the islands >>></Link>;

        if (this.props.sessionChecked && !this.props.sessionPlayer) {
            playPanel = <LoginForm />;
        }

        return (
            <div className="t-home">
                <div className="t-home__hero">
                    <div className="t-home_hero-contents home-hero">
                        <h1>Planet Cargo</h1>
                    </div>
                </div>
                <div className="t-home__play panel">
                    <h2>Play now</h2>
                    {playPanel}
                </div>
                <main className="t-home__main">
                    <h1>Welcome welcome welcome</h1>
                    <ul>
                        <li><Link to="/play">Play</Link></li>
                        <li><Link to={portsPath}>Ports</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/about/styleguide">Styleguide</Link></li>
                        <li><Link to="/about/status">Status</Link></li>
                    </ul>
                </main>
                <aside className="t-home__aside">
                    <p>More side stuff</p>
                </aside>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface): Props => ({
        sessionPlayer: state.session.player,
        sessionChecked: state.session.playerFetched,
    }),
    null
)(Container);
