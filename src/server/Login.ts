import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router-dom";
import { withGuestUser } from "./withGuestUser";
import { LoginPage } from "../pages/LoginPage";

class LoginComponent extends Component<RouteProps, undefined> {
  public render() {
    return createElement(LoginPage, { query: this.props.location.search });
  }
}

export const Login = withGuestUser(withRouter(LoginComponent as any));
