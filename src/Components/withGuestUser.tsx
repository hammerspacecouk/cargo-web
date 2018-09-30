import * as React from 'react';
import { match, Redirect } from "react-router";
import routes from "../routes";
import withInitialData, { InitialDataComponent } from "./withInitialData";
import { Request } from "express";

interface Props {
  isLoggedIn?: boolean;
}

// This is a HOC that ensures the user is NOT already logged in
export default (Page: InitialDataComponent) => {
  class WithGuestUser extends React.Component<Props, undefined> {
    static async getInitialData(match: match, request: Request) {
      if (request.cookies.AUTHENTICATION_TOKEN) {
        return { isLoggedIn: true }
      }
      // Need to call the wrapped components getInitialData if it exists
      if (Page.getInitialData) {
        return Page.getInitialData(match, request);
      }
      return null;
    }

    render() {
      if (this.props.isLoggedIn) {
        return <Redirect to={routes.getPlay()} />;
      }

      // Flatten out all the props.
      const { isLoggedIn, ...rest } = this.props;
      return (
        <Page{...rest}/>
      );
    }
  }
  return withInitialData(WithGuestUser);
};
