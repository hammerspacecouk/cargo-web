import * as React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import CrumbTitle from "../../../Components/CrumbTitle";

class AboutContainer extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__title">
                    <CrumbTitle>
                        About Planet Cargo
                    </CrumbTitle>
                </div>
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

export default connect()(AboutContainer);
