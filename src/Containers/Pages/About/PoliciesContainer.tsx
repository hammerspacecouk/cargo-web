import * as React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>Policies</h1>
                    <p>
                        We don't ask for a password, so we don't store your password.
                    </p>
                    <p>
                        The application is coded in the open, so go see if you
                        trust it.
                    </p>
                </div>
            </div>
        )
    }
}

export default connect()(Container);
