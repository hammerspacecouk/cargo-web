import * as React from "react";

import Loading from "../../Components/Navigation/Loading";
import NotFound from "../../Components/Error/NotFound";
import PortInterface from "../../DomainInterfaces/PortInterface";
import CrumbTitle from "../../Components/Navigation/CrumbTitle";
import { getPort } from "../../Models/Port";

interface Props {
  match: {
    params: {
      portId: string;
    };
  };
}

interface StateInterface {
  port?: PortInterface;
  portLoaded: boolean;
}

class ShowContainer extends React.Component<Props, StateInterface> {
  constructor(props: Props) {
    super(props);
    this.state = {
      port: null,
      portLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const port = await getPort(this.props.match.params.portId);
      this.setState({
        port,
        portLoaded: true
      });
    } catch (e) {
      this.setState({
        port: null,
        portLoaded: true
      });
    }
  }

  render() {
    let portData = null;
    let title = "";

    if (this.state.port) {
      portData = <p>{this.state.port.id}</p>;
      title = this.state.port.name;
    } else {
      portData = this.state.portLoaded ? <NotFound /> : <Loading />;
    }
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle crumbs={[{ link: "/ports", title: "Ports" }]}>
            {title}
          </CrumbTitle>
        </div>
        <div className="t-doc__main">{portData}</div>
      </div>
    );
  }
}

export default ShowContainer;
