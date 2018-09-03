import * as React from "react";
import { RouteProps, withRouter } from "react-router";
import { parse as parseQueryString } from "query-string";
import TokenButton from "../Common/TokenButton";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import Error from "../../Components/Error/Error";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import EnsureLoggedOut from "../Common/EnsureLoggedOut";

export interface Props {
  player?: PlayerInterface;
  token?: string;
}

class LoginEmailContainer extends React.Component<RouteProps, undefined> {
  getResponse() {
    const query = parseQueryString(this.props.location.search);
    if (!query.token) {
      return <Error code={400} message="Bad request (Missing token)" />;
    }

    const token: ActionTokenInterface = {
      path: "/login/email",
      token: query.token
    };

    return this.renderPage(token);
  }

  render() {
    return <EnsureLoggedOut>{this.getResponse()}</EnsureLoggedOut>;
  }

  renderPage(token: ActionTokenInterface) {
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <h1>Login using e-mail</h1>
        </div>
        <div className="t-doc__main">
          <p>
            Thank you for clicking the link in your e-mail. If you didn't mean
            to, don't worry; Nothing has happened yet. To perform the login and
            continue to your game click below.
          </p>
          <TokenButton token={token}>
            <button className="button button--confirm">Continue</button>
          </TokenButton>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginEmailContainer as any);
