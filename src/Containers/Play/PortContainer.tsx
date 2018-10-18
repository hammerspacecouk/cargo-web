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
import PortInterface from "../../DomainInterfaces/PortInterface";
import EventsContainer from "./EventsContainer";
import DirectionNW from "../../Components/Icons/DirectionNW";
import DirectionNE from "../../Components/Icons/DirectionNE";
import DirectionW from "../../Components/Icons/DirectionW";
import DirectionE from "../../Components/Icons/DirectionE";
import DirectionSW from "../../Components/Icons/DirectionSW";
import DirectionSE from "../../Components/Icons/DirectionSE";
import IntervalFormat from "../../Components/Formatting/IntervalFormat";

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
        <ShieldIcon/>
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
      this.props.shipContext.updateShipLocation(data);
    } catch (e) {
      // todo - error handling
    }
  }

  renderDirection(directionIcon: JSX.Element, direction?: DirectionInterface) {
    if (!direction) {
      return null;
    }

    const buttonDisabled = direction.action === null;
    let minimumRank = null;
    let actionButton = (
      <button
        className="button button--icon"
        type="submit"
        disabled={buttonDisabled}
        title="Go"
      >
        {directionIcon}
      </button>
    );
    if (!buttonDisabled) {
      actionButton = (
        <TokenButton
          token={direction.action}
          handler={this.moveShip.bind(this)}
        >{actionButton}</TokenButton>
      )
    }

    if (buttonDisabled && direction.minimumRank) {
      minimumRank = (
        <div className="f">Minimum rank: {direction.minimumRank.title}</div>
      );
    }

    return (
      <tr className="destinations__row">
        <td className="destinations__destination d">
          {inlinePortName(direction.destination)}
          {minimumRank}
        </td>
        <td className="destinations__distance">
          <span className="d">{direction.distanceUnit}</span>
          <abbr className="f" title="light year">ly</abbr>
        </td>
        <td className="destinations__time">
          <IntervalFormat seconds={direction.journeyTimeSeconds}/>
        </td>
        <td className="destinations__earnings">-</td>
        {/* todo - set this based on current cargo stocked in ship */}
        <td className="destinations__action">
          {actionButton}
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
    if (this.props.playerRankStatus.portsVisited === 1) {
      // todo - tooltip tour
      welcome = (
        <MessageInfo>
          <p>
            Welcome to {this.props.shipContext.port.name} spaceport. It is a{" "}
            <strong>Safe Haven</strong>
            <abbr title="Safe Haven" className="icon icon--mini">
              <ShieldIcon/>
            </abbr>. It costs you nothing to be here and your ship cannot be
            harmed while it is here.
          </p>
          <p>
            This is your home spaceport. Any newly launched ships will set off from here
          </p>
        </MessageInfo>
      );
    }

    let safe = null;
    if (this.props.shipContext.port.safeHaven) {
      safe = (
        <abbr title="Safe Haven" className="icon icon--mid">
          <ShieldIcon/>
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
          {this.renderDirection(
            <DirectionNW/>,
            this.props.shipContext.directions.NW
          )}
          {this.renderDirection(
            <DirectionNE/>,
            this.props.shipContext.directions.NE
          )}
          {this.renderDirection(
            <DirectionW/>,
            this.props.shipContext.directions.W
          )}
          {this.renderDirection(
            <DirectionE/>,
            this.props.shipContext.directions.E
          )}
          {this.renderDirection(
            <DirectionSW/>,
            this.props.shipContext.directions.SW
          )}
          {this.renderDirection(
            <DirectionSE/>,
            this.props.shipContext.directions.SE
          )}
          </tbody>
        </table>

        <h2>Players</h2>
        <ShipList ships={this.props.shipContext.shipsInLocation}/>

        <EventsContainer events={this.props.shipContext.events}/>
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
