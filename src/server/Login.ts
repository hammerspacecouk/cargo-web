import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router-dom";
import { LoginContainer } from "../contexts/GameContext/LoginContainer";
import { withGuestUser } from "./withGuestUser";

class LoginComponent extends Component<RouteProps, undefined> {
  public render() {
    return createElement(LoginContainer, { query: this.props.location.search });
  }
}

export const Login = withGuestUser(withRouter(LoginComponent as any));
