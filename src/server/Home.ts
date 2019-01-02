import { Component, createElement } from "react";
import { withInitialData } from "./withInitialData";

import { IEvent } from "../Interfaces";
import HomePage from "../pages/HomePage";
import { ApiClient } from "../util/ApiClient";

interface IProps {
  events: IEvent[];
}

class Home extends Component<IProps, undefined> {
  public static async getInitialData() {
    return ApiClient.fetch("/");
  }

  public render() {
    return createElement(HomePage, {
      events: this.props.events,
    });
  }
}

export const Home = withInitialData(Home);
