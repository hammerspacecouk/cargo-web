import * as React from "react";
import { match } from "react-router";
import withInitialData, { InitialDataComponent } from "../sections/withInitialData";
import { Request } from "express";
import RequireLogin from "./Login/RequireLogin";

interface Props {
  isLoggedOut?: boolean;
}

// This is a HOC that ensures the user is already logged in
export default (Page: InitialDataComponent) => {
  class WithPlayer extends React.Component<Props, undefined> {
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
        return <RequireLogin />;
      }

      // Flatten out all the props.
      const { isLoggedOut, ...rest } = this.props;
      return <Page {...rest} />;
    }
  }
  return withInitialData(WithPlayer);
};
