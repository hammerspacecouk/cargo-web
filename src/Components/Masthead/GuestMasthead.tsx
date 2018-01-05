import * as React from 'react';
import {Link} from "react-router-dom";

export default () => {
    return (
        <div className="masthead">
            <div className="masthead__logo"><Link to="/">Planet Cargo</Link></div>
            <div className="masthead__login"><Link to="/login">Login</Link></div>
        </div>
    )
};
