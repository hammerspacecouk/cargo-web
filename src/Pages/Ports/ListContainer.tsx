import * as React from "react";

import PortInterface from "../../interfaces/PortInterface";
import CrumbTitle from "../../components/Navigation/CrumbTitle";
import { fetchList } from "../../Models/Port";
import withInitialData from "../../sections/withInitialData";
import routes from "../../routes";

interface PropsInterface {
  isLoading: boolean;
  ports?: PortInterface[];
}

class ListContainer extends React.Component<PropsInterface, undefined> {
  static async getInitialData() {
    const ports = await fetchList();
    return { ports: ports.items };
  }

  render() {
    const ports = (
      <ul>
        {this.props.ports.map((port: PortInterface, index: number) => {
          return (
            <li key={index}>
              <a href={routes.getPortShow(port.id)}>{port.name}</a>
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle>Ports</CrumbTitle>
        </div>
        <div className="t-doc__main">{ports}</div>
      </div>
    );
  }
}

export default withInitialData(ListContainer);
