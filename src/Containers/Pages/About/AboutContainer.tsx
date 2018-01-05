import * as React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

class Container extends React.Component<undefined, undefined> {
    render() {
        return (
            <div>
                <h1>About Planet Cargo</h1>
                <p>
                   More stuff. Twitter etc
                </p>

                <h2>More pages</h2>
                <ul>
                    <li><Link to="/about/policies">Policies</Link></li>
                    <li><Link to="/about/status">Application Status</Link></li>
                    <li><Link to="/about/styleguide">Styleguide</Link></li>
                </ul>
            </div>
        )
    }
}

export default connect()(Container);
