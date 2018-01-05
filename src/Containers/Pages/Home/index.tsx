import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

import {PATH_LIST as portsPath} from "../../../Domain/Port";
import {getAsset} from "../../../Application/Assets";

class Container extends React.Component<undefined, undefined> {
    render() {
        let playPanel = <Link to="/play">Go to the islands >>></Link>;

        // if (this.state.userChecked && !this.state.user) {
        //     playPanel = <LoginForm />;
        // }

        return (
            <div className="t-home">
                <div className="t-home__hero">
                    <div className="t-home_hero-contents home-hero">
                        <h1>Planet Cargo - {getAsset('app.js')}</h1>
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

export default connect()(Container);
