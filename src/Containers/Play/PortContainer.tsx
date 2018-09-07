import * as React from "react";
import DirectionInterface from "../../DomainInterfaces/DirectionInterface";
import TokenButton from "../Button/TokenButton";
import RankStatusInterface from "../../DomainInterfaces/RankStatusInterface";
import ShipList from "../../Components/Ship/ShipList";
import { SessionContext } from "../../Context/SessionContext";
import { CurrentShipContextInterface } from "../../Context/CurrentShipContext";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import { moveShip } from "../../Models/Ship";
import ShieldIcon from "../../Components/Icons/ShieldIcon";
import { MessageInfo } from "../../Components/Panel/Messages";
import CreditsIcon from "../../Components/Icons/CreditsIcon";
import PortInterface from "../../DomainInterfaces/PortInterface";

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

// todo - abstract this and use it lots
// todo - (with the proper interface - combined with fleetships)
const inlinePortName = (port: PortInterface) => {
  let safe = null;
  if (port.safeHaven) {
    safe = (
      <abbr title="Safe Haven" className="m-icon-suffix__icon">
        <ShieldIcon />
      </abbr>
    );
  }
  return (
    <span className="m-icon-suffix">
      <span className="m-icon-suffix__text">{port.name}</span>
      {safe}
    </span>
  );
};

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

  renderDirection(directionTitle: string, direction?: DirectionInterface) {
    if (!direction) {
      return (
        <tr className="destinations__row destinations__row--inactive">
          <td className="destinations__direction">{directionTitle}</td>
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      );
    }

    let safe = null;
    if (direction.destination.safeHaven) {
      safe = (
        <abbr title="Safe Haven" className="icon icon--mini">
          <ShieldIcon />
        </abbr>
      );
    }

    return (
      <tr className="destinations__row">
        <td className="destinations__direction">{directionTitle}</td>
        <td className="destinations__destination d">
          {inlinePortName(direction.destination)}
        </td>
        <td className="destinations__distance">
          <span className="d">{direction.distanceUnit}</span>
          <span className="f">km</span>
        </td>
        <td className="destinations__time">2m 4s</td>
        {/* todo - real value */}
        <td className="destinations__earnings">-</td>
        {/* todo - set this based on current cargo stocked in ship */}
        <td className="destinations__action">
          <TokenButton
            token={direction.action}
            handler={this.moveShip.bind(this)}
          >
            <button className="button" type="submit">
              Go
            </button>
          </TokenButton>
        </td>
      </tr>
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
        <MessageInfo>
          <p>
            Welcome to {this.props.shipContext.port.name}. It is a{" "}
            <strong>Safe Haven</strong>
            <abbr title="Safe Haven" className="icon icon--mini">
              <ShieldIcon />
            </abbr>. It costs you nothing to be here and your ship cannot be
            harmed while it is here.
          </p>
          <p>
            This is your home port. Should you run out of{" "}
            <abbr title="Credits" className="icon icon--mini">
              <CreditsIcon />
            </abbr>{" "}
            on the high seas, your ships will be returned to here
          </p>
        </MessageInfo>
      );
    }

    let safe = null;
    if (this.props.shipContext.port.safeHaven) {
      safe = (
        <abbr title="Safe Haven" className="icon icon--mid">
          <ShieldIcon />
        </abbr>
      );
    }

    return (
      <div>
        <h1>
          {this.props.shipContext.port.name} {safe}
        </h1>
        {welcome}
        <h2 className="table-head">Where next?</h2>
        <table className="destinations">
          <thead>
            <tr>
              <th>Direction</th>
              <th>Destination Port</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Earnings</th>
              <th>Go?</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDirection("NW", this.props.shipContext.directions.NW)}
            {this.renderDirection("NE", this.props.shipContext.directions.NE)}
            {this.renderDirection("W", this.props.shipContext.directions.W)}
            {this.renderDirection("E", this.props.shipContext.directions.E)}
            {this.renderDirection("SW", this.props.shipContext.directions.SW)}
            {this.renderDirection("SE", this.props.shipContext.directions.SE)}
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
