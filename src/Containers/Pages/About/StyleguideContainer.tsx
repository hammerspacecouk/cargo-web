import * as React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <div className="text--prose">
                    <h1>Styleguide</h1>
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

                    <h3>Breadcrumbs</h3>

                    <h3>Single item:</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                    </ol>

                    <h3>Multiple items:</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb two</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb three</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb four</a></li>
                    </ol>

                    <h2>Organisms</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Container);
