import { Component, createElement } from "react";
import { ApiClient } from "../utils/ApiClient";
import { HomePage } from "../components/Pages/HomePage";

export default class extends Component {
  public static async getInitialProps({req}) {
    const data = await ApiClient.fetch('/', undefined, req);
    return {
      events: data.events
    }
  }

  public render() {
    return createElement(HomePage, this.props);
  }
}
