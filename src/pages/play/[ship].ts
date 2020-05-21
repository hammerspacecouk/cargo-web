import { Component, createElement } from "react";
import { GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { ActiveShipContainer } from "@src/contexts/ActiveShipContext/ActiveShipContainer";
import { ShipDetailPage } from "@src/components/Pages/Play/ActiveShip/ShipDetailPage";

class Page extends Component {
  public render() {
    return createElement(ShipDetailPage, this.props);
  }
}

export default GameSessionContainer(ActiveShipContainer(Page));
