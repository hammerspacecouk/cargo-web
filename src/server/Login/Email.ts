import { Component, createElement } from "react";
import { RouteProps, withRouter } from "react-router-dom";
import { LoginEmailPage } from "../../pages/Login/LoginEmailPage";
import { withGuestUser } from "../withGuestUser";

class EmailComponent extends Component<RouteProps, undefined> {
  public render() {
    return createElement(LoginEmailPage, { query: this.props.location.search });
  }
}

export const Email = withGuestUser(withRouter(EmailComponent as any));
