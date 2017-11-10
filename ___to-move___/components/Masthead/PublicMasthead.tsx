import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    loginClicked: {(event: React.MouseEvent<HTMLAnchorElement>): void};
}

export default (props: Props) => {
    return (
        <div className="masthead masthead--public">
            <div className="masthead__logo">
                <Link to="/">P</Link>
            </div>
            <div className="masthead__login">
                <Link to="/login" onClick={props.loginClicked}>Login</Link>
            </div>
        </div>
    );
}
