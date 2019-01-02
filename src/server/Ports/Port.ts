import { match } from "react-router-dom";
import { withInitialData } from "../withInitialData";
import { Component, createElement } from "react";
import { ApiClient } from "../../util/ApiClient";
import { PortPage } from "../../pages/Ports/PortPage";
import { IPort } from "../../Interfaces";

interface IParamsMatch extends match {
  params: {
    portId: string;
  };
}

interface IShowComponentProps {
  port?: IPort;
}

class ShowComponent extends Component<IShowComponentProps, undefined> {
  public static async getInitialData(routeMatch: IParamsMatch) {
    const port = await ApiClient.fetch(`/ports/${routeMatch.params.portId}`);
    return { port };
  }

  public render() {
    return createElement(PortPage, { port: this.props.port });
  }
}

export const Port = withInitialData(ShowComponent);
