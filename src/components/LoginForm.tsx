import * as React from 'react';

import DI from '../DI';

export interface LoginFormProps {
    loginPathEmail: string;
    loginPathFacebook: string;
    loginPathGoogle: string;
    loginPathTwitter: string;
    emailSent: boolean;
}

export default (props: LoginFormProps) => {
    let sentMsg = null;
    if (props.emailSent) {
        sentMsg = (
            <p className="message" style={{color:"red"}}>Check your e-mail for the login link</p>
        );
    }

    return (
        <div>
            <h2>Login</h2>
            {sentMsg}
            <p>
                We identify which player you are by confirming your unique e-mail address.
                Use one of the following methods. We don't get access to your data on these services.
                No spam, no sharing with third parties.
            </p>
            <p>
                <a href="#">More info on our policy</a>
            </p>
            <ul>
                <li><a href={props.loginPathFacebook}>
                    <img src={DI.getAssets().get('login-button-facebook.png')} alt="Login with Facebook" />
                </a></li>
                <li><a href={props.loginPathGoogle}>
                    <img src={DI.getAssets().get('login-button-google.png')} alt="Login with Google" />
                </a></li>
                <li><a href={props.loginPathTwitter}>
                    <img src={DI.getAssets().get('login-button-twitter.png')} alt="Login with Twitter" />
                </a></li>
            </ul>
            <form action={props.loginPathEmail} method="post">
                <h3>Receive a one-time e-mail login link</h3>
                <p>
                    <label>
                        E-mail address
                        <input type="email" name="target" />
                    </label>
                </p>
                <p>
                    <button type="submit">Send</button>
                </p>
            </form>
        </div>
    );
};
