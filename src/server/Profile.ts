import { Request } from "express";
import { Component, createElement } from "react";
import { match, RouteProps } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";
import { ApiClient } from "../util/ApiClient";
import { withPlayer } from "./withPlayer";
import { ISessionResponse } from "../context/SessionContext";
import { IPort } from "../Interfaces";

interface IProps extends RouteProps {
  readonly session: ISessionResponse;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: IPort;
}

class ProfileComponent extends Component<IProps, undefined> {
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
    return createElement(ProfilePage, this.props);
  }
}

export const Profile = withPlayer(ProfileComponent);
