import { Component, createElement } from "react";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import { ActiveShipContainer } from "../../contexts/ActiveShipContext/ActiveShipContainer";
import { ShipDetailPage } from "../../components/Pages/Play/ActiveShip/ShipDetailPage";

class Page extends Component {
  public render() {
    return createElement(ShipDetailPage, this.props);
  }
}

export default GameSessionContainer(ActiveShipContainer(Page));
