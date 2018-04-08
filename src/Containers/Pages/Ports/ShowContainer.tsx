import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import { StateInterface } from "../../../State";
import Loading from "../../../Components/Loading";
import { APIClientInterface } from "../../../Data/API";
import NotFound from "../../../Components/Error/NotFound";
import PortInterface from "../../../DomainInterfaces/PortInterface";
import CrumbTitle from "../../../Components/CrumbTitle";

interface Props {
  match: {
    params: {
      portId: string;
    };
  };
  port: PortInterface;
  portLoaded: boolean;
  dispatch: Dispatch<any>;
  apiClient: APIClientInterface;
}

class ShowContainer extends React.Component<Props, undefined> {
  componentDidMount() {
    PortActions.fetchSingle(
      this.props.match.params.portId,
      this.props.apiClient,
      this.props.dispatch
    );
  }

  render() {
    let portData = null;
    let title = "";

    if (this.props.port) {
      portData = <p>{this.props.port.id}</p>;
      title = this.props.port.name;
    } else {
      portData = this.props.portLoaded ? <NotFound /> : <Loading />;
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

export default connect((state: StateInterface) => ({
  apiClient: state.environment.apiClient,
  port: state.ports.port,
  portLoaded: !state.ports.fetchingPort
}))(ShowContainer);
