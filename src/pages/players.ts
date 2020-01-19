import { Component, createElement } from "react";
import { NextPageContext } from "next";
import { ApiClient } from "../utils/ApiClient";
import { IPlayersPageProps, PlayersPage } from "../components/Pages/PlayersPage";

export default class extends Component<IPlayersPageProps> {
  public static async getInitialProps({ req }: NextPageContext) {
    return ApiClient.fetch(`/players`, undefined, req);
  }

  public render() {
    return createElement(PlayersPage, this.props);
  }
}
