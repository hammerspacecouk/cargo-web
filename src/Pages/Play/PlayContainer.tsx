import * as React from "react";

import PortContainer from "../../Containers/Play/PortContainer";
import TravellingContainer from "../../Containers/Play/TravellingContainer";
import EnsureShipContainer from "./EnsureShipContainer";
import { ShipParamsInterface } from "./index";
import {
  CurrentShipContext,
  CurrentShipContextInterface
} from "../../Context/CurrentShipContext";

class PlayContainer extends React.Component<ShipParamsInterface, undefined> {
  render() {
    return (
      <EnsureShipContainer shipId={this.props.match.params.shipId}>
        <CurrentShipContext.Consumer>
          {this.renderPage.bind(this)}
        </CurrentShipContext.Consumer>
      </EnsureShipContainer>
    );
  }

  renderPage(shipContext: CurrentShipContextInterface) {
    let main = null;
    if (shipContext.port) {
      main = <PortContainer shipContext={shipContext} />;
    } else if (shipContext.channel) {
      main = <TravellingContainer shipContext={shipContext} />;
    }

    return (
      <main className="t-play__content-contain">
        <h1 style={{ display: "none" }}>{shipContext.ship.name}</h1>
        {main}
      </main>
    ); // todo - visually hidden css for the H1
  }
}

export default PlayContainer;
