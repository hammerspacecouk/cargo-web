import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router";
import { withGuestUser } from "./withGuestUser";

import { LoginPage } from "../pages/LoginPage";
import { LoginEmailPage } from "../pages/Login/LoginEmailPage";

class LoginComponent extends Component<RouteProps, undefined> {
  render() {
    return createElement(LoginPage, { query: this.props.location.search });
  }
}

class EmailComponent extends Component<RouteProps, undefined> {
  render() {
    return createElement(LoginEmailPage, { query: this.props.location.search });
  }
}

export const Login = withGuestUser(withRouter(LoginComponent as any));
export const Email = withGuestUser(withRouter(EmailComponent as any));
