import { Request } from "express";
import { Component, createElement } from "react";
import { match } from "react-router-dom";
import { RequireLogin } from "../components/Organisms/RequireLogin/RequireLogin";
import { IInitialDataComponent, withInitialData } from "./withInitialData";

interface IProps {
  isLoggedOut?: boolean;
}

// This is a HOC that ensures the user is already logged in
export const withPlayer = (Page: IInitialDataComponent) => {
  class WithPlayer extends Component<IProps, undefined> {
    public static async getInitialData(routeMatch: match, request: Request) {
      // request & cookies will only be available on the server
      if (request && request.cookies && !request.cookies.AUTHENTICATION_TOKEN) {
        return { isLoggedOut: true };
      }
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(routeMatch, request);
      }
      return null;
    }

    public render() {
      if (this.props.isLoggedOut) {
        return createElement(RequireLogin);
      }

      // Flatten out all the props.
      const { isLoggedOut, children, ...rest } = this.props;
      return createElement(
        Page,
        {
          ...rest,
        },
        children
      );
    }
  }
  return withInitialData(WithPlayer);
};
