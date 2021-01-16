import { Component, createElement } from "react";
import { ILandingPageProps, LandingPage } from "@src/components/Pages/Play/LandingPage";
import { CurrentPage, GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { ApiClient } from "@src/utils/ApiClient";

export class Page extends Component<ILandingPageProps, undefined> {
  public static async getInitialProps({ req }: NextPageContext) {
    return ApiClient.fetch("/play/map", undefined, req);
  }

  public render() {
    return createElement(LandingPage, this.props);
  }
}

export default GameSessionContainer(Page, CurrentPage.home);
