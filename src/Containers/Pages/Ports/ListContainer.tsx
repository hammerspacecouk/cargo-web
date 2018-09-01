import * as React from "react";

import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";
import Error from "../../../Components/Error/Error";
import PortInterface, {
  PATH_SHOW
} from "../../../DomainInterfaces/PortInterface";
import CrumbTitle from "../../../Components/CrumbTitle";
import { fetchList } from "../../../Models/Port";

interface StateInterface {
  ports?: PortInterface[];
  listLoaded: boolean;
}

class ListContainer extends React.Component<undefined, StateInterface> {
  constructor(props: undefined) {
    super(props);
    this.state = {
      ports: null,
      listLoaded: false
    };
  }

  async componentDidMount() {
    try {
      const ports = await fetchList();
      this.setState({
        ports: ports.items,
        listLoaded: true
      });
    } catch (e) {
      this.setState({
        ports: null,
        listLoaded: true
      });
    }
  }

  render() {
    let ports = null;

    if (this.state.ports) {
      ports = (
        <ul>
          {this.state.ports.map((port: PortInterface, index: number) => {
            return (
              <li key={index}>
                <Link to={PATH_SHOW(port.id)}>{port.name}</Link>
              </li>
            );
          })}
        </ul>
      );
    } else {
      ports = this.state.listLoaded ? <Error /> : <Loading />;
    }

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

export default ListContainer;
