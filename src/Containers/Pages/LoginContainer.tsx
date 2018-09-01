import * as React from "react";
import { RouteProps, withRouter } from "react-router";

import LoginForm from "../../Components/LoginForm";

import messageQueryString from "../../Utils/MessageQueryString";
import EnsureLoggedOut from "../Common/EnsureLoggedOut";

class LoginContainer extends React.Component<RouteProps, undefined> {
  render() {
    return (
      <EnsureLoggedOut>
        <div className="t-doc">
          <div className="t-doc__title">
            <h1>Login</h1>
          </div>
          <div className="t-doc__main">
            <LoginForm
              messages={messageQueryString(this.props.location.search)}
            />
          </div>
        </div>
      </EnsureLoggedOut>
    );
  }
}

export default withRouter(LoginContainer as any);
