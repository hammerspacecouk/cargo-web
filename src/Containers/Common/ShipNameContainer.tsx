import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as EditShipActions from "../../Actions/EditShip/Actions";
import EditShipActionTypes from "../../Actions/EditShip/ActionTypes";
import { StateInterface } from "../../State";
import { APIClientInterface } from "../../Data/API";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import TokenButton from "../Common/TokenButton";

interface LocalState {
  nameGuess: string;
  matched: boolean;
}

interface Props {
  requestingShipName?: boolean;
  acceptingShipName?: boolean;
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;

  dispatch?: Dispatch<any>;
  apiClient?: APIClientInterface;
}

class ShipNameContainer extends React.Component<Props, LocalState> {
  private allowAnimationUpdate: boolean;
  private nameToMatch?: string = null;
  private overrideTimer: any;
  private guessArray?: string[];
  private characters: string[] = `abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.split(
    ""
  );
  private lastGuess: number = 0;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = {
      nameGuess: "",
      matched: false
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.requestingShipName && !this.props.requestingShipName) {
      this.guessArray = null;
      this.nameToMatch = null;
      this.updateGuess();
    }
    if (
      newProps.offeredShipName &&
      newProps.offeredShipName !== this.props.offeredShipName
    ) {
      this.nameToMatch = newProps.offeredShipName;
      this.overrideTimer = window.setTimeout(() => {
        if (this.overrideTimer) {
          this.setState({
            nameGuess: this.nameToMatch
          });
        }
      }, 3000);
    }
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    if (this.props.offeredShipName) {
      this.setState({
        nameGuess: this.props.offeredShipName,
        matched: true
      });
    }
  }

  updateGuess() {
    if (!this.allowAnimationUpdate) {
      return;
    }

    if (
      this.state.nameGuess &&
      this.state.nameGuess.trim() === this.nameToMatch
    ) {
      this.guessArray = null;
      this.overrideTimer = null;
      this.setState({
        nameGuess: this.nameToMatch,
        matched: true
      });
      return;
    }

    const now = Date.now();
    if (now < this.lastGuess + 35) {
      // slow the animation down by only running every x milliseconds
      window.requestAnimationFrame(() => this.updateGuess());
      return;
    }
    this.lastGuess = now;

    if (!this.guessArray) {
      let guessStartLength = 25;
      this.guessArray = [];
      for (let i = 0; i < guessStartLength; i++) {
        this.guessArray.push(
          this.characters[Math.floor(Math.random() * this.characters.length)]
        );
      }
    }

    let guessLength = this.guessArray.length;
    let nameToMatchArray = null;
    // todo - don't calculate this every loop
    if (this.nameToMatch) {
      let namePadded =
        this.nameToMatch + new Array(guessLength).fill(" ").join("");
      let reduced = namePadded.slice(
        0,
        Math.max(this.nameToMatch.length, this.guessArray.length)
      );
      nameToMatchArray = reduced.split("");

      const nameLength = nameToMatchArray.length;
      if (nameLength > guessLength) {
        for (let i = guessLength; i < nameLength; i++) {
          this.guessArray.push(
            this.characters[Math.floor(Math.random() * this.characters.length)]
          );
        }
      }
    }

    const charactersLength = this.characters.length;

    for (let i = 0; i < guessLength; i++) {
      if (nameToMatchArray && nameToMatchArray[i] === this.guessArray[i]) {
        continue;
      }

      let newIndex = this.characters.indexOf(this.guessArray[i]) + 7;
      if (newIndex >= charactersLength) {
        newIndex = newIndex - charactersLength;
      }
      this.guessArray[i] = this.characters[newIndex];
    }

    this.setState({
      matched: false,
      nameGuess: this.guessArray.join("")
    });

    window.requestAnimationFrame(() => this.updateGuess());
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
    this.overrideTimer = null;
  }

  rejectNameOffer(e: Event) {
    e.preventDefault();
    this.props.dispatch({ type: EditShipActionTypes.REJECT_SHIP_NAME_OFFER });
  }

  renderAccepting() {
    return <h3>Updating</h3>;
  }

  renderOffer() {
    let acceptanceButtons = null;
    if (this.props.offeredShipNameToken && this.state.matched) {
      acceptanceButtons = (
        <TokenButton
          token={this.props.offeredShipNameToken}
          handler={EditShipActions.acceptShipName}
        >
          <a
            href="."
            className="btn btn--soft-danger"
            onClick={this.rejectNameOffer.bind(this)}
          >
            Reject
          </a>
          <button className="btn btn--confirm" type="submit">
            Accept
          </button>
        </TokenButton>
      );
    }

    return (
      <table className="table">
        <tbody>
          <tr>
            <td>
              <h3 className="d">Name offered</h3>
              <p className="b monospace">{this.state.nameGuess}</p>
            </td>
            <td className="text--right">{acceptanceButtons}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    if (this.props.acceptingShipName) {
      return this.renderAccepting();
    }

    if (this.props.requestingShipName || this.props.offeredShipName) {
      return this.renderOffer();
    }

    return null;
  }
}

export default connect(
  (state: StateInterface) => ({
    apiClient: state.environment.apiClient,

    requestingShipName: state.editShip.requestingShipName,
    acceptingShipName: state.editShip.acceptingShipName,
    offeredShipName: state.editShip.offeredShipName,
    offeredShipNameToken: state.editShip.offeredShipNameToken
  }),
  null
)(ShipNameContainer);
