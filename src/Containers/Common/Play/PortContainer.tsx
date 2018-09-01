import * as React from "react";
import DirectionInterface from "../../../DomainInterfaces/DirectionInterface";
import TokenButton from "../../Common/TokenButton";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";
import ShipList from "../../../Components/ShipList";
import { SessionContext } from "../../../Context/SessionContext";
import {
  CurrentShipContext,
  CurrentShipContextInterface
} from "../../../Context/CurrentShipContext";
import ScoreInterface from "../../../DomainInterfaces/ScoreInterface";
import ActionTokenInterface from "../../../DomainInterfaces/ActionTokenInterface";
import { moveShip, requestShipName } from "../../../Models/Ship";

interface Props {
  readonly shipContext: CurrentShipContextInterface;
}

interface LocalProps extends Props {
  readonly updateScore: (newScore: ScoreInterface) => void;
  readonly playerRankStatus: RankStatusInterface;
}

interface StateInterface {
  departingPort: boolean;
}

class PortContainer extends React.Component<LocalProps, StateInterface> {
  constructor(props: LocalProps) {
    super(props);
    this.state = {
      departingPort: false
    };
  }

  async moveShip(token: ActionTokenInterface) {
    this.setState({
      departingPort: true
    });

    try {
      const data = await moveShip(token);
      this.props.updateScore(data.playerScore);
      this.props.shipContext.updateFullResponse(data);
    } catch (e) {
      // todo - error handling
    }
  }

  renderDirection(direction?: DirectionInterface) {
    if (!direction) {
      return null;
    }

    return (
      <div>
        <h3>{direction.destination.name}</h3>
        <TokenButton
          token={direction.action}
          handler={this.moveShip.bind(this)}
        >
          <button className="btn" type="submit">
            Go ({direction.distanceUnit})
          </button>
        </TokenButton>
      </div>
    );
  }

  // todo - break out into components
  render() {
    if (this.state.departingPort) {
      return (
        <div>
          <h1>{this.props.shipContext.port.name}</h1>
          <p>Departing...</p>
        </div>
      );
    }

    let welcome = null;
    if (this.props.playerRankStatus.portsVisited === 0) {
      welcome = (
        <div className="text--prose">
          <p>
            Welcome to {this.props.shipContext.port.name}. It is a{" "}
            <strong>Safe Haven</strong>. It costs you nothing to be here and
            your ship cannot be harmed while it is here.
          </p>
          <p>
            This is your home port. Should you run out of time on the high seas,
            your ships will be returned to here
          </p>
        </div>
      );
    }

    return (
      <div>
        <h1>{this.props.shipContext.port.name}</h1>
        {welcome}
        <table style={{ minWidth: "400px" }}>
          <tbody>
            <tr>
              <td>
                <h2>NW</h2>
                {this.renderDirection(this.props.shipContext.directions.NW)}
              </td>
              <td>
                <h2>NE</h2>
                {this.renderDirection(this.props.shipContext.directions.NE)}
              </td>
            </tr>
            <tr>
              <td>
                <h2>W</h2>
                {this.renderDirection(this.props.shipContext.directions.W)}
              </td>
              <td>
                <h2>E</h2>
                {this.renderDirection(this.props.shipContext.directions.E)}
              </td>
            </tr>
            <tr>
              <td>
                <h2>SW</h2>
                {this.renderDirection(this.props.shipContext.directions.SW)}
              </td>
              <td>
                <h2>SE</h2>
                {this.renderDirection(this.props.shipContext.directions.SE)}
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Players</h2>
        <ShipList ships={this.props.shipContext.shipsInLocation} />
      </div>
    );
  }
}

export default (props: Props) => (
  <SessionContext.Consumer>
    {({ updateScore, rankStatus }) => (
      <PortContainer
        {...props}
        playerRankStatus={rankStatus}
        updateScore={updateScore}
      />
    )}
  </SessionContext.Consumer>
);
