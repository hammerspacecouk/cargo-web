import * as React from 'react';
import { Link } from 'react-router-dom';
import {UserInterface} from "../../models/User";
import {Services} from "../../DI";
import LoginForm from "../../containers/LoginForm";

interface State {
    user?: UserInterface;
    userChecked: boolean;
}


export default class Home extends React.Component<undefined, State> {
    constructor() {
        super();
        this.state = {
            user: null,
            userChecked: false,
        }
    }

    async componentDidMount() {
        this.setState({
            user: await Services.user.init(),
            userChecked: true,
        });
    }

    render() {
        let playPanel = <Link to="/play">Go to the islands >>></Link>;

        if (this.state.userChecked && !this.state.user) {
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
                    <h1>Welcome to the world</h1>
                    <ul>
                        <li><Link to="/play">Play</Link></li>
                        <li><Link to="/ports">Ports</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/styleguide">Styleguide</Link></li>
                    </ul>
                </main>
                <aside className="t-home__aside">
                    <p>More side stuff</p>
                </aside>
            </div>
        )
    }
}
