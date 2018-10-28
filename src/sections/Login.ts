import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router";
import withGuestUser from "./withGuestUser";

import LoginPage from "../components/Pages/LoginPage";
import LoginEmailPage from "../components/Pages/Login/LoginEmailPage";

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

export default withGuestUser(withRouter(LoginComponent as any));
export const Email = withGuestUser(withRouter(EmailComponent as any));
