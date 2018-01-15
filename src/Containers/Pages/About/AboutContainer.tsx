import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Container extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <h1 className="t-doc__title">About Planet Cargo</h1>
                <div className="t-doc__main">
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
            </div>
        )
    }
}

export default connect()(Container);
