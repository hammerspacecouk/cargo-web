import { Component, createElement } from "react";
import { RouteProps } from "react-router-dom";
import { PortsPage } from "../pages/PortsPage";
import { ApiClient } from "../util/ApiClient";
import { withInitialData } from "./withInitialData";

class ListComponent extends Component<RouteProps, undefined> {
  public static async getInitialData() {
    const ports = await ApiClient.fetch("/ports");
    return { ports: ports.items };
  }

  public render() {
    return createElement(PortsPage);
  }
}

export const Ports = withInitialData(ListComponent);
