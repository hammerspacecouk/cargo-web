import * as React from "react";
import DirectionInterface from "../../interfaces/DirectionInterface";
import TokenButton from "../Button/TokenButton";
import RankStatusInterface from "../../interfaces/RankStatusInterface";
import ShipList from "../../components/Ship/ShipList";
import { SessionContext } from "../../context/SessionContext";
import { CurrentShipContextInterface } from "../../context/CurrentShipContext";
import ScoreInterface from "../../interfaces/ScoreInterface";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { doPortAction } from "../../Models/Ship";
import ShieldIcon from "../../components/Icons/ShieldIcon";
import { MessageInfo } from "../../components/Panel/Messages";
import PortInterface from "../../interfaces/PortInterface";
import EventsList from "../../components/Events/EventsList";
import DirectionNW from "../../components/Icons/DirectionNW";
import DirectionNE from "../../components/Icons/DirectionNE";
import DirectionW from "../../components/Icons/DirectionW";
import DirectionE from "../../components/Icons/DirectionE";
import DirectionSW from "../../components/Icons/DirectionSW";
import DirectionSE from "../../components/Icons/DirectionSE";
import IntervalFormat from "../../components/Formatting/IntervalFormat";
import CreditsIcon from "../../components/Icons/CreditsIcon";
import Fraction from "../../components/Formatting/Fraction";
import ScoreValue from "../../components/Player/ScoreValue";
import Modal from "../../components/Panel/Modal";

interface Props {
  readonly shipContext: CurrentShipContextInterface;
}

interface LocalProps extends Props {
  readonly updateScore: (newScore: ScoreInterface) => void;
  readonly playerRankStatus: RankStatusInterface;
}

interface StateInterface {
  departingPort: boolean;
  buttonsDisabled: boolean;
  confirmMoveButton?: JSX.Element;
  modalOpen: boolean;
}

// todo - abstract this and use it lots
// todo - (with the proper interface - combined with fleet ships)
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
      departingPort: false,
      buttonsDisabled: false,
      confirmMoveButton: null,
      modalOpen: false
    };
  }

  moveShip = async (token: ActionTokenInterface) => {
    this.setState({
      departingPort: true,
      buttonsDisabled: true
    });

    try {
      const data = await doPortAction(token);
      this.props.updateScore(data.playerScore);
      this.props.shipContext.updateShipLocation(data); // todo - use full response
    } catch (e) {
      // todo - error handling
    } finally {
      this.setState({
        buttonsDisabled: false
      });
    }
  };

  moveCrate = async (token: ActionTokenInterface) => {
    this.setState({
      buttonsDisabled: true
    });

    try {
      const data = await doPortAction(token);
      this.props.updateScore(data.playerScore);
      this.props.shipContext.updateFullResponse(data);
    } catch (e) {
      // todo - error handling
    } finally {
      this.setState({
        buttonsDisabled: false
      });
    }
  };

  renderDirection = (
    directionIcon: JSX.Element,
    direction?: DirectionInterface
  ) => {
    if (!direction) {
      return null;
    }

    const buttonDisabled =
      direction.action === null || this.state.buttonsDisabled;
    let minimumRank = null;
    let minimumStrength = null;
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
        <TokenButton token={direction.action} handler={this.moveShip}>
          {actionButton}
        </TokenButton>
      );
    }

    let goButton = actionButton;
    if (
      this.props.shipContext.cratesOnShip.length === 0 &&
      this.props.shipContext.ship.shipClass.capacity > 0 &&
      this.props.shipContext.cratesInPort.length > 0
    ) {
      goButton = (
        <button
          className="button button--icon"
          type="submit"
          disabled={buttonDisabled}
          title="Go"
          onClick={() => {
            this.setState({
              confirmMoveButton: (
                <TokenButton token={direction.action} handler={this.moveShip}>
                  <button className="button button--confirm" type="submit">
                    Yes
                  </button>
                </TokenButton>
              ),
              modalOpen: true
            });
          }}
        >
          {directionIcon}
        </button>
      );
    }

    if (buttonDisabled && direction.minimumRank) {
      minimumRank = (
        <div className="f">Minimum rank: {direction.minimumRank.title}</div>
      );
    }
    if (buttonDisabled && direction.minimumStrength) {
      minimumStrength = (
        <div className="f">
          This ship is not strong enough for this journey. Minimum:
          {direction.minimumStrength}
        </div>
      );
    }

    let distance = <span className="d">{direction.distanceUnit}</span>;
    if (direction.distanceUnit === 0) {
      distance = <Fraction num={1} den={100} />;
    }

    return (
      <tr className="destinations__row">
        <td className="destinations__destination d">
          {inlinePortName(direction.destination)}
          {minimumRank}
          {minimumStrength}
        </td>
        <td className="destinations__distance">
          {distance}
          <abbr className="f" title="light year">
            ly
          </abbr>
        </td>
        <td className="destinations__time">
          <IntervalFormat seconds={direction.journeyTimeSeconds} />
        </td>
        <td className="destinations__earnings">
          <ScoreValue score={direction.earnings.toString()} />
        </td>
        <td className="destinations__action">{goButton}</td>
      </tr>
    );
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      confirmMoveButton: null
    });
  };

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

    const modal = (
      <Modal
        isOpen={this.state.modalOpen}
        onClose={this.closeModal}
        title="Are you sure?"
      >
        <p>
          You have not picked up any crates. Are you sure you want to take off?
        </p>
        <div className="modal__action">
          {this.state.confirmMoveButton}
          <button
            className="button button--soft-danger"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );

    let welcome = null;
    if (this.props.playerRankStatus.portsVisited === 1) {
      // todo - tooltip tour
      welcome = (
        <MessageInfo>
          <p>
            Welcome to {this.props.shipContext.port.name} spaceport. It is a{" "}
            <strong>Safe Haven</strong>
            <abbr title="Safe Haven" className="icon icon--mini">
              <ShieldIcon />
            </abbr>. It costs you nothing to be here and your ship cannot be
            harmed while it is here.
          </p>
          <p>
            This is your home spaceport. Any newly launched ships will set off
            from here
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
        <div className="t-port-shipping">
          <div className="t-port-ship">
            <h2 className="table-head">Crates on Ship</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Contents</th>
                  <th>Value</th>
                  <th>Drop</th>
                </tr>
              </thead>
              <tbody>{cratesOnShip}</tbody>
            </table>
          </div>
          <div className="t-port-crates">
            <h2 className="table-head">Crates at Port</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Contents</th>
                  <th>Value</th>
                  <th>Pickup</th>
                </tr>
              </thead>
              <tbody>
                {this.props.shipContext.cratesInPort.map(crateAction => {
                  let tokenButton = (
                    <button className="button" disabled={true}>
                      Pickup
                    </button>
                  );
                  if (crateAction.token) {
                    tokenButton = (
                      <TokenButton
                        token={crateAction.token}
                        handler={this.moveCrate}
                      >
                        <button
                          className="button"
                          type="submit"
                          disabled={this.state.buttonsDisabled}
                        >
                          Pickup
                        </button>
                      </TokenButton>
                    );
                  }

                  return (
                    <tr key={crateAction.crate.id}>
                      <td>{crateAction.crate.contents}</td>
                      <td>
                        <span className="c">+{crateAction.valuePerLY}</span>{" "}
                        <span className="icon icon--mini">
                          <CreditsIcon />
                        </span>/ly
                      </td>
                      <td>{tokenButton}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <h2 className="table-head">Where next?</h2>
        <table className="destinations">
          <thead>
            <tr>
              <th>Direction</th>
              <th>Destination Port</th>
              <th>Distance</th>
              <th>Travel Time</th>
              <th>Earnings</th>
              <th>Go?</th>
            </tr>
          </thead>
          <tbody>
            {this.renderDirection(
              <DirectionNW />,
              this.props.shipContext.directions.NW
            )}
            {this.renderDirection(
              <DirectionNE />,
              this.props.shipContext.directions.NE
            )}
            {this.renderDirection(
              <DirectionW />,
              this.props.shipContext.directions.W
            )}
            {this.renderDirection(
              <DirectionE />,
              this.props.shipContext.directions.E
            )}
            {this.renderDirection(
              <DirectionSW />,
              this.props.shipContext.directions.SW
            )}
            {this.renderDirection(
              <DirectionSE />,
              this.props.shipContext.directions.SE
            )}
          </tbody>
        </table>

        <h2>Players</h2>
        <ShipList ships={this.props.shipContext.shipsInLocation} />

        <EventsList events={this.props.shipContext.events} />
        {modal}
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
