import { createElement, Component } from "react";
import { match } from "react-router";
import withInitialData, { InitialDataComponent } from "./withInitialData";
import { Request } from "express";
import RequireLogin from "../components/Login/RequireLogin";

interface Props {
  isLoggedOut?: boolean;
}

// This is a HOC that ensures the user is already logged in
export default (Page: InitialDataComponent) => {
  class WithPlayer extends Component<Props, undefined> {
    static async getInitialData(match: match, request: Request) {
      if (request && !request.cookies.AUTHENTICATION_TOKEN) {
        return { isLoggedOut: true };
      }
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(match, request);
      }
      return null;
    }

    render() {
      if (this.props.isLoggedOut) {
        return createElement(RequireLogin);
      }

      // Flatten out all the props.
      const { isLoggedOut, ...rest } = this.props;
      return createElement(Page, {
        ...rest
      });
    }
  }
  return withInitialData(WithPlayer);
};
