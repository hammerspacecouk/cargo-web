import * as React from "react";

import NotFound from "../../Components/Error/NotFound";
import PortInterface from "../../DomainInterfaces/PortInterface";
import CrumbTitle from "../../Components/Navigation/CrumbTitle";
import { getPort } from "../../Models/Port";
import { match } from "react-router";
import withInitialData from "../../Components/withInitialData";

interface PropsInterface {
  isLoading: boolean;
  port?: PortInterface;
}

interface ParamsMatch extends match {
  params: {
    portId: string;
  };
}

class ShowContainer extends React.Component<PropsInterface, undefined> {
  static async getInitialData(match: ParamsMatch) {
    const port = await getPort(match.params.portId);
    return { port };
  }

  componentDidMount() {
    // todo - periodcally refetch() for latest data
  }

  render() {
    if (!this.props.port) {
      return <NotFound message="You need a new map. There is no port here" />
    }

    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle crumbs={[{ link: "/ports", title: "Ports" }]}>
            {this.props.port.name}
          </CrumbTitle>
        </div>
        <div className="t-doc__main">
          <p>{this.props.port.id}</p>
        </div>
      </div>
    );
  }
}

export default withInitialData(ShowContainer);
