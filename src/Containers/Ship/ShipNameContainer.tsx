import * as React from "react";

import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import TokenButton from "../Button/TokenButton";
import ShipInterface from "../../interfaces/ShipInterface";
import { CurrentShipContext } from "../../context/CurrentShipContext";
import { acceptShipName } from "../../Models/Ship";
import { SlowedAnimationFrame } from "../../util/Animate";

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
  private originalGuessLength: number = 25;
  private characterIncrement: number = 7;
  private animate: SlowedAnimationFrame;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = {
      nameGuess: "",
      matched: false,
      acceptingShipName: false
    };

    this.animate = new SlowedAnimationFrame(35, this.updateGuess.bind(this));
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    // if we were mounted with a shipName, then just show it immediately
    if (this.props.offeredShipName) {
      this.setState({
        nameGuess: this.props.offeredShipName,
        matched: true
      });
      return;
    }
    // otherwise, begin the guessing
    this.startGuessing();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    // if we've been updated with no shipName, then we're fetching a new one.
    // Begin the animation.
    if (!this.props.offeredShipName && prevProps.offeredShipName) {
      this.startGuessing();
      return;
    }

    // if we now have a shipName then save it to start bringing the animation to an end
    if (
      this.props.offeredShipName &&
      this.props.offeredShipName !== prevProps.offeredShipName
    ) {
      this.endGuessing(this.props.offeredShipName);
    }
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
    this.overrideTimer = null;
  }

  startGuessing() {
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
    this.updateGuess();
  }

  endGuessing(nameToMatch: string) {
    this.nameToMatch = nameToMatch.trim();

    // make an array equal to the largest of the originalGuess or nameToMatch
    let namePadded =
      this.nameToMatch + new Array(this.originalGuessLength).fill(" ").join("");
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

  finished() {
    this.guessArray = null;
    this.overrideTimer = null;
    this.setState({
      nameGuess: this.nameToMatch,
      matched: true
    });
  }

  updateGuess() {
    if (!this.allowAnimationUpdate || !this.guessArray) {
      return;
    }

    // if our guess is the same as the intended, then we're done. End the loop
    if (
      this.state.nameGuess &&
      this.state.nameGuess.trim() === this.nameToMatch
    ) {
      this.finished();
      return;
    }

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

    this.animate.frame();
  }

  rejectNameOffer(e: Event) {
    e.preventDefault();
    this.props.resetOffer();
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
            href="Common"
            className="button button--soft-danger"
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
                <button className="button button--confirm" type="submit">
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
