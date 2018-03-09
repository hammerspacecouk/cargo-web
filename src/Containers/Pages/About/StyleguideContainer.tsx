import * as React from 'react';
import { connect } from 'react-redux';
import CrumbTitle from "../../../Components/CrumbTitle";

class StyleguideContainer extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__title">
                    <CrumbTitle crumbs={[{link:'/about', title: 'About Planet Cargo'}]}>
                        Styleguide
                    </CrumbTitle>
                </div>
                <div className="t-doc__main">
                    <div className="text--prose">
                    <p>
                        This is a collection of elements to demonstrate the overall design of the application.
                    </p>

                    <h2>Core</h2>
                    <h2>Atoms</h2>

                    <h3>Buttons</h3>

                    <p><button className="btn">Standard button</button></p>
                    <p><button className="btn btn--confirm">Confirm</button></p>
                    <p><button className="btn btn--danger">Reject</button></p>
                    <p><button className="btn btn--soft-danger">Soft Reject</button></p>


                    <h2>Molecules</h2>

                    <h3>Messages</h3>
                        <ul className="messages">
                            <li className="messages__message">Default message (info)</li>
                            <li className="messages__message messages__message--ok">Success message (ok)</li>
                            <li className="messages__message messages__message--error">Error message (error)</li>
                            <li className="messages__message messages__message--warning">Warning message (warning)</li>
                        </ul>


                    <h2>Organisms</h2>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(StyleguideContainer);
