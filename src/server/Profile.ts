import { Component, createElement } from "react";
import { match, RouteProps, withRouter } from "react-router";

import ProfilePage from "../pages/ProfilePage";
import DeletePage from "../pages/Profile/DeletePage";
import withPlayer from "./withPlayer";
import { ApiClient } from "../util/ApiClient";
import { Request } from "express";

class ProfileComponent extends Component<RouteProps, undefined> {
  static async getInitialData(_: match, request: Request) {
    try {
      return await ApiClient.fetch(
        "/profile",
        null,
        request && request.cookies
      );
    } catch (e) {
      if (e.statusCode && e.statusCode === 403) {
        return { isLoggedOut: true };
      }
      throw e;
    }
  }

  render() {
    return createElement(ProfilePage);
  }
}

class DeleteComponent extends Component<RouteProps, undefined> {
  render() {
    return createElement(DeletePage, { query: this.props.location.search });
  }
}

export default withPlayer(ProfileComponent);
export const Delete = withPlayer(withRouter(DeleteComponent as any));
