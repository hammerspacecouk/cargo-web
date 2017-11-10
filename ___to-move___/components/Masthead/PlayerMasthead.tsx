import * as React from 'react';
import { Link } from 'react-router-dom';
import {UserInterface} from "../../models/User";
import Score from "../../containers/Score";

interface Props {
    user?: UserInterface;
}

export default ({ user }: Props) => {
    return (
        <div className="masthead masthead--player">
            <div className="masthead__logo">
                <Link to="/">Player Ship!</Link>
            </div>
            <div className="masthead__login">
                <Link to="/profile">Profile</Link>
            </div>
            <div className="masthead__score">
                <Score score={user.score}/>
            </div>
        </div>
    );
}
