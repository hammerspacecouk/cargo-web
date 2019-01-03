import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { withGuestUser } from "./withGuestUser";

class LoginComponent extends Component<RouteProps, undefined> {
  public render() {
    return createElement(LoginPage, { query: this.props.location.search });
  }
}

export const Login = withGuestUser(withRouter(LoginComponent as any));
