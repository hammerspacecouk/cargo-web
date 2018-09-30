import * as React from "react";
import { RouteProps, withRouter } from "react-router";

import LoginForm from "../Components/Login/LoginForm";

import messageQueryString from "../Utils/MessageQueryString";
import withGuestUser from "../Components/withGuestUser";

class LoginContainer extends React.Component<RouteProps, undefined> {
  render() {
    return (
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
    );
  }
}

export default withGuestUser(withRouter(LoginContainer as any));
