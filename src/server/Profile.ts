import { Request } from "express";
import { Component, createElement } from "react";
import { match, RouteProps } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { ApiClient } from "../util/ApiClient";
import { withPlayer } from "./withPlayer";

class ProfileComponent extends Component<RouteProps, undefined> {
  public static async getInitialData(_: match, request: Request) {
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

  public render() {
    return createElement(ProfilePage);
  }
}

export const Profile = withPlayer(ProfileComponent);
