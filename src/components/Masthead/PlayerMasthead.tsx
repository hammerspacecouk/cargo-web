import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="masthead masthead--player">
            <div className="masthead__logo">
                <Link to="/">Player Ship!</Link>
            </div>
            <div className="masthead__login">
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}
