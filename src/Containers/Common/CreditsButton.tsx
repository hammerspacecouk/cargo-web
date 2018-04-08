import * as React from "react";
import { connect } from "react-redux";
import { StateInterface } from "../../State";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import { getValue } from "./ScoreContainer";

interface Props {
  readonly amount: number;
  readonly disabled?: boolean;
  readonly playerScore: ScoreInterface;
}

interface LocalState {
  disabled: boolean;
}

class CreditsButton extends React.Component<Props, LocalState> {
  private allowAnimationUpdate: boolean;

  constructor(props: Props) {
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
      <button className="btn" type="submit" disabled={this.state.disabled}>
        {this.props.amount} credits
      </button>
    );
  }
}

export default connect((state: StateInterface, ownProps: any): Props => ({
  amount: ownProps.amount,
  disabled: ownProps.disabled || false,
  playerScore: state.session.score
}))(CreditsButton);
