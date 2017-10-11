import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<undefined, undefined> {
    render() {

        // let loginPanel = (
        //     <div>
        //         <h2>Login</h2>
        //         <LoginForm />
        //     </div>
        // );
        // if (DI.isLoggedIn()) {
        //     loginPanel = (
        //         <div>
        //             <Link to="/play">Play</Link>
        //         </div>
        //     );
        // }

        // on component mount, check if the user is logged in. If so, redirect to /play. If not, replace the play
        // link with the login panel

        return (
            <div>
                <h1>HOME</h1>
                <div>
                    <h1>Welcome welcome welcome</h1>
                </div>
                <ul>
                    <li><Link to="/play">Play</Link></li>
                    <li><Link to="/ports">Ports</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        )
    }
}
