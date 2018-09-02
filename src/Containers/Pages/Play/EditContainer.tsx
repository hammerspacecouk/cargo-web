import * as React from "react";

import ActionTokenInterface from "../../../DomainInterfaces/ActionTokenInterface";
import TokenButton from "../../Common/TokenButton";
import CreditsButton from "../../Common/CreditsButton";
import ShipNameContainer from "../../Common/ShipNameContainer";
import EnsureShipContainer from "./EnsureShipContainer";
import { ShipParamsInterface } from "./index";
import {
  CurrentShipContext,
  CurrentShipContextInterface
} from "../../../Context/CurrentShipContext";
import { SessionContext } from "../../../Context/SessionContext";
import ScoreInterface from "../../../DomainInterfaces/ScoreInterface";
import { requestShipName } from "../../../Models/Ship";
import ShipNameTokenInterface from "../../../DomainInterfaces/ShipNameTokenInterface";

interface Props extends ShipParamsInterface {
  requestShipNameCost: number;
  requestShipNameToken: ActionTokenInterface;
}

interface State {
  requestingShipName: boolean;
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;
}

class EditContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      requestingShipName: false,
      offeredShipName: null,
      offeredShipNameToken: null
    };
  }

  async requestShipName(
    token: ActionTokenInterface,
    updateScoreHandler: (newScore: ScoreInterface) => void,
    updateRenameToken: (newToken: ShipNameTokenInterface) => void
  ) {
    this.setState({
      requestingShipName: true,
      offeredShipName: null,
      offeredShipNameToken: null
    });

    //make the API call
    try {
      const data = await requestShipName(token);

      // update the state
      this.setState({
        requestingShipName: false,
        offeredShipName: data.nameOffered,
        offeredShipNameToken: data.action
      });

      // update the score
      updateScoreHandler(data.newScore);
      updateRenameToken(data.requestShipName);
    } catch (e) {
      // todo - error handling, including if you didn't have enough credits
    }
  }

  render() {
    return (
      <EnsureShipContainer shipId={this.props.match.params.shipId}>
        <CurrentShipContext.Consumer>
          {this.renderPage.bind(this)}
        </CurrentShipContext.Consumer>
      </EnsureShipContainer>
    );
  }

  renderPage(currentShip: CurrentShipContextInterface) {
    let shipName = null;
    if (this.state.requestingShipName || this.state.offeredShipName) {
      shipName = (
        <ShipNameContainer
          offeredShipName={this.state.offeredShipName}
          offeredShipNameToken={this.state.offeredShipNameToken}
          resetOffer={() => {
            this.setState({
              offeredShipName: null,
              offeredShipNameToken: null
            });
          }}
        />
      );
    }

    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <h1>{currentShip.ship.name}</h1>
        </div>
        <div className="t-doc__main">
          <table className="table table--striped">
            <tbody>
              <tr>
                <th>Class</th>
                <td>Paddle boat</td>
              </tr>
              <tr>
                <th>Capacity</th>
                <td>2</td>
              </tr>
            </tbody>
          </table>
          <h2>Request a new ship name</h2>
          <p>
            A new name will be selected at random. You don't have to take it,
            but no refunds
          </p>
          <SessionContext.Consumer>
            {({ updateScore }) => (
              <TokenButton
                token={currentShip.requestShipNameToken.actionToken}
                handler={(token: ActionTokenInterface) =>
                  this.requestShipName(token, updateScore, currentShip.updateRenameToken)
                }
              >
                <CreditsButton
                  amount={currentShip.requestShipNameToken.cost}
                  disabled={this.state.requestingShipName}
                />
              </TokenButton>
            )}
          </SessionContext.Consumer>
          {shipName}
        </div>
      </div>
    );
  }
}

export default EditContainer;
