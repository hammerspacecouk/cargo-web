import { Component, createElement } from "react";
import { ApiClient } from "../../utils/ApiClient";
import { NextPageContext } from "next";
import { IPlayerPageProps, PlayerPage } from "../../components/Pages/Players/PlayerPage";

export default class extends Component<IPlayerPageProps> {
  public static async getInitialProps({ req, query }: NextPageContext) {
    return ApiClient.fetch(`/players/${query.player}`, undefined, req);
  }

  public render() {
    return createElement(PlayerPage, this.props);
  }
}
