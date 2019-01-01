import { Component, createElement } from "react";
import { match, RouteProps } from "react-router";

import { ApiClient } from "../util/ApiClient";
import { withInitialData } from "./withInitialData";
import { PortsPage } from "../pages/PortsPage";
import { PortPage } from "../pages/Ports/PortPage";
import { PortInterface } from "../Interfaces";

interface ParamsMatch extends match {
  params: {
    portId: string;
  };
}

class ListComponent extends Component<RouteProps, undefined> {
  static async getInitialData() {
    const ports = await ApiClient.fetch("/ports");
    return { ports: ports.items };
  }

  render() {
    return createElement(PortsPage);
  }
}

interface ShowComponentProps {
  port?: PortInterface;
}

class ShowComponent extends Component<ShowComponentProps, undefined> {
  static async getInitialData(match: ParamsMatch) {
    const port = await ApiClient.fetch(`/ports/${match.params.portId}`);
    return { port };
  }

  render() {
    return createElement(PortPage, { port: this.props.port });
  }
}

export const Ports = withInitialData(ListComponent);
export const Port = withInitialData(ShowComponent);
