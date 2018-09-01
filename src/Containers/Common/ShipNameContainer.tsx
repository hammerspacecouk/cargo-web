import * as React from "react";

import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import TokenButton from "../Common/TokenButton";
import ShipInterface from "../../DomainInterfaces/ShipInterface";
import { CurrentShipContext } from "../../Context/CurrentShipContext";
import { acceptShipName } from "../../Models/Ship";

interface State {
  nameGuess: string;
  matched: boolean;
  acceptingShipName: boolean;
}

interface Props {
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;
  resetOffer: () => void;
}

class ShipNameContainer extends React.Component<Props, State> {
  private allowAnimationUpdate: boolean;
  private nameToMatchArray?: string[] = null;
  private nameToMatch?: string = null;
  private overrideTimer: any;
  private guessArray?: string[];
  private characters: string[] = `abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.split(
    ""
  );
  private lastGuess: number = 0;
  private originalGuessLength: number = 25;
  private characterIncrement: number = 7;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = {
      nameGuess: "",
      matched: false,
      acceptingShipName: false
    };
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    // if we were mounted with a shipName, then just show it immediately
    if (this.props.offeredShipName) {
      this.setState({
        nameGuess: this.props.offeredShipName,
        matched: true
      });
    }
    window.requestAnimationFrame(this.updateGuess.bind(this));
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // if we've been updated with no shipName, then we're fetching a new one.
    // Begin the animation.
    if (!this.props.offeredShipName && prevProps.offeredShipName) {
      // on the first run make an array of Random characters.
      // Each character will increment until it matches
      this.guessArray = [];
      for (let i = 0; i < this.originalGuessLength; i++) {
        this.guessArray.push(
          this.characters[Math.floor(Math.random() * this.characters.length)]
        );
      }
      this.nameToMatch = null;
      this.nameToMatchArray = null;
      window.requestAnimationFrame(this.updateGuess.bind(this));
    }

    // if we now have a shipName then save it to start bringing the animation to an end
    if (
      this.props.offeredShipName &&
      this.props.offeredShipName !== prevProps.offeredShipName
    ) {
      this.nameToMatch = this.props.offeredShipName;

      // make an array equal to the largest of the originalGuess or nameToMatch
      let namePadded =
        this.nameToMatch +
        new Array(this.originalGuessLength).fill(" ").join("");
      let reduced = namePadded.slice(
        0,
        Math.max(this.nameToMatch.length, this.originalGuessLength)
      );
      this.nameToMatchArray = reduced.split("");

      // if the name we're trying to match now has more characters, add more characters to the guess
      const nameLength = this.nameToMatchArray.length;
      const guessLength = this.guessArray.length;
      if (nameLength > guessLength) {
        for (let i = guessLength; i < nameLength; i++) {
          this.guessArray.push(
            this.characters[Math.floor(Math.random() * this.characters.length)]
          );
        }
      }

      // add an override timer to stop the animation getting stuck forever
      this.overrideTimer = window.setTimeout(() => {
        if (this.overrideTimer) {
          this.setState({
            nameGuess: this.nameToMatch
          });
        }
      }, 3000);
    }
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
    this.overrideTimer = null;
  }

  updateGuess(now: number) {
    if (!this.allowAnimationUpdate) {
      return;
    }

    // if our guess is the same as the intended, then we're done. End the loop
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
    if (!this.guessArray) {
      return;
    }

    // slow the animation down by only running every x milliseconds
    if (this.lastGuess && now < this.lastGuess + 35) {
      window.requestAnimationFrame(this.updateGuess.bind(this));
      return;
    }
    this.lastGuess = now;

    const charactersLength = this.characters.length;
    const guessLength = this.guessArray.length;

    // check each of the guessed characters in turn
    for (let i = 0; i < guessLength; i++) {
      // if this character has arrived at the matching Name character, leave it alone
      if (
        this.nameToMatchArray &&
        this.nameToMatchArray[i] === this.guessArray[i]
      ) {
        continue;
      }

      // increment the character (wrapping around if required)
      let newIndex =
        this.characters.indexOf(this.guessArray[i]) + this.characterIncrement;
      if (newIndex >= charactersLength) {
        newIndex = newIndex - charactersLength;
      }
      this.guessArray[i] = this.characters[newIndex];
    }

    this.setState({
      matched: false,
      nameGuess: this.guessArray.join("")
    });

    window.requestAnimationFrame(this.updateGuess.bind(this));
  }

  rejectNameOffer(e: Event) {
    e.preventDefault();
    this.props.resetOffer();
    // this.props.dispatch({type: EditShipActionTypesonTypes.REJECT_SHIP_NAME_OFFER});
  }

  async acceptShipName(
    token: ActionTokenInterface,
    updateShipHandler: (newShip: ShipInterface) => void
  ) {
    this.setState({
      acceptingShipName: true
    });

    //make the API call
    try {
      const ship = await acceptShipName(token);

      // update the state
      this.setState({
        acceptingShipName: false
      });

      // update the score
      updateShipHandler(ship);
      this.props.resetOffer();
    } catch (e) {
      // todo - error handling
    }
  }

  render() {
    if (this.state.acceptingShipName) {
      return this.renderAccepting();
    }
    return this.renderOffer();
  }

  renderAccepting() {
    return <h3>Updating</h3>;
  }

  renderOffer() {
    let acceptanceButtons = null;
    if (this.props.offeredShipNameToken && this.state.matched) {
      acceptanceButtons = (
        <React.Fragment>
          <a
            href="."
            className="btn btn--soft-danger"
            onClick={this.rejectNameOffer.bind(this)}
          >
            Reject
          </a>

          <CurrentShipContext.Consumer>
            {({ updateCurrentShip }) => (
              <TokenButton
                token={this.props.offeredShipNameToken}
                handler={(token: ActionTokenInterface) =>
                  this.acceptShipName(token, updateCurrentShip)
                }
              >
                <button className="btn btn--confirm" type="submit">
                  Accept
                </button>
              </TokenButton>
            )}
          </CurrentShipContext.Consumer>
        </React.Fragment>
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
}

export default ShipNameContainer;
