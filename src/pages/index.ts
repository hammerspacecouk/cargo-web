import { Component, createElement } from "react";
import { ApiClient } from "../utils/ApiClient";
import { HomePage, IHomePageProps } from "../components/Pages/HomePage";
import { NextPageContext } from "next";

export default class extends Component<IHomePageProps> {
  public static async getInitialProps({ req }: NextPageContext) {
    const data = await ApiClient.fetch("/", undefined, req);
    return {
      events: data.events,
      goalCrateLocation: data.goalCrateLocation
    };
  }

  public render() {
    return createElement(HomePage, this.props);
  }
}
