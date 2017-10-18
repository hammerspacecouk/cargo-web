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
            <div className="template template--home">
                <div className="template-home__hero">
                    <h1>Planet Cargo</h1>
                </div>
                <div className="template-home__intro">
                    <h1>Welcome welcome welcome</h1>
                </div>
                <ul className="template-home__links">
                    <li><Link to="/play">Play</Link></li>
                    <li><Link to="/ports">Ports</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/styleguide">Styleguide</Link></li>
                </ul>
                <div className="template-home__play">
                    <h2>Play now</h2>
                    {playPanel}
                </div>
            </div>
        )
    }
}
