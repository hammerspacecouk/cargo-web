import * as React from "react";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import { getValue } from "../Player/ScoreContainer";
import { SessionContext } from "../../Context/SessionContext";
import IconButton from "../../Components/Button/IconButton";
import CreditsIcon from "../../Components/Icons/CreditsIcon";
import ScoreValue from "../../Components/Player/ScoreValue";

interface Props {
  readonly amount: number;
  readonly disabled?: boolean;
}

interface LocalProps extends Props {
  readonly playerScore: ScoreInterface;
}

interface LocalState {
  disabled: boolean;
}

class CreditsButtonState extends React.Component<LocalProps, LocalState> {
  private allowAnimationUpdate: boolean;

  constructor(props: LocalProps) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = {
      disabled: this.isDisabled(props.amount, props.playerScore, props.disabled)
    };
  }

  isDisabled(
    amount: number,
    playerScore: ScoreInterface,
    disabledOverride: boolean
  ): boolean {
    if (disabledOverride) {
      return true;
    }
    if (amount === 0) {
      return false;
    }
    const scoreValue = getValue(playerScore, new Date());
    return scoreValue < amount;
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    this.update();
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
  }

  update() {
    if (!this.allowAnimationUpdate) {
      return;
    }
    this.setState({
      disabled: this.isDisabled(
        this.props.amount,
        this.props.playerScore,
        this.props.disabled
      )
    });
    window.requestAnimationFrame(() => this.update());
  }

  render() {
    return (
      <button className="button" type="submit" disabled={this.state.disabled}>
        <ScoreValue score={this.props.amount.toString(10)} />
      </button>
    );
  }
}

const CreditsButton = (props: Props) => (
  <SessionContext.Consumer>
    {({ score }) => <CreditsButtonState {...props} playerScore={score} />}
  </SessionContext.Consumer>
);

export default CreditsButton;
