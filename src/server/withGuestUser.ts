import { Request } from "express";
import { Component, createElement } from "react";
import { match, Redirect } from "react-router-dom";
import { routes } from "../routes";
import { IInitialDataComponent, withInitialData } from "./withInitialData";

interface IProps {
  isLoggedIn?: boolean;
}

// This is a HOC that ensures the user is NOT already logged in
export const withGuestUser = (Page: IInitialDataComponent) => {
  class WithGuestUser extends Component<IProps, undefined> {
    public static async getInitialData(routeMatch: match, request: Request) {
      if (request && request.cookies && request.cookies.AUTHENTICATION_TOKEN) {
        return { isLoggedIn: true };
      }
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(routeMatch, request);
      }
      return null;
    }

    public render() {
      if (this.props.isLoggedIn) {
        return createElement(Redirect, {
          to: routes.getPlay(),
        });
      }

      // Flatten out all the props.
      const { isLoggedIn, children, ...rest } = this.props;
      return createElement(
        Page,
        {
          ...rest,
        },
        children
      );
    }
  }
  return withInitialData(WithGuestUser);
};
