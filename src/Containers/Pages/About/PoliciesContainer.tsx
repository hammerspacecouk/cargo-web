import * as React from 'react';
import { connect } from 'react-redux';

class Container extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>Policies</h1>
                    <h2>Human readable</h2>
                    <h3>Security</h3>
                    <p>
                        We don't ask for a password, so we don't store your password.
                    </p>
                    <h3>Your data</h3>
                    <p>
                        It is necessary to have a piece of information unique to you in order to allow
                        you to login. We use your e-mail address. This means we have to store it to be able
                        to find you again.
                        We do not store which third-party account you used to tell us your e-mail address.
                        We do not have any further access to those third party accounts and cannot post as you.
                        We will not sell or disclose your e-mail address.
                        We will not e-mail you unless you ask us to (and we won't automatically sign you up for everything on registration)
                        If somebody sends you an invite we will email you once, and not store your address.
                        We will not be able to contact you again even if we wanted to.
                    </p>
                    <p>
                        We offer a delete account option, and we mean it.
                        The <a href="https://en.wikipedia.org/wiki/The_Entire_History_of_You" target="_blank">entire history of you</a> is
                        deleted immediately if you use this option and it cannot be recovered.
                    </p>
                    <p>
                        The application is coded in the open, so go see if you
                        trust it.
                    </p>
                    <h2>Legalese</h2>
                    <p>This is the same basic principles as above, but in the correct legal language</p>
                </div>
            </div>
        )
    }
}

export default connect()(Container);
