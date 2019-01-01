import { Component, createElement } from "react";
import { withInitialData } from "./withInitialData";

import { EventInterface } from "../Interfaces";
import { ApiClient } from "../util/ApiClient";
import HomePage from "../pages/HomePage";

interface Props {
  events: EventInterface[];
}

class Home extends Component<Props, undefined> {
  static async getInitialData() {
    return ApiClient.fetch("/");
  }

  render() {
    return createElement(HomePage, {
      events: this.props.events
    });
  }
}

export default withInitialData(Home);
