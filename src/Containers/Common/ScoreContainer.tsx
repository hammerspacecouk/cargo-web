import * as React from "react";
import * as differenceInMilliseconds from "date-fns/difference_in_milliseconds";

import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import ScoreValue from "../../Components/ScoreValue";

interface Props {
  score: ScoreInterface;
}

interface LocalState {
  scoreText: string;
  rate: string;
  effectClass: string;
}

export const getValue = (score: ScoreInterface, now: Date) => {
  const calculationDate = new Date(score.datetime);
  const millisecondsDiff = differenceInMilliseconds(now, calculationDate);

  const earned = millisecondsDiff / 1000 * score.rate;

  const current = score.value + earned;

  if (current < 0) {
    return 0;
  }

  return current;
};

class ScoreContainer extends React.Component<Props, LocalState> {
  private allowAnimationUpdate: boolean;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = this.calculateScoreState(props.score);
  }

  formatNumber(input: number): string {
    let output = input.toFixed(0);

    // minimum 5 digits
    return output.padStart(5, "0");
  }

  calculateScoreState(score: ScoreInterface): LocalState {
    const value = getValue(score, new Date());
    let effectClass = "";

    if (score.rate < 0 && value <= 0) {
      effectClass = "score--dead";
    }

    return {
      scoreText: this.formatNumber(value),
      rate: score.rate.toString(),
      effectClass
    };
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    this.updateScore();
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
  }

  updateScore() {
    if (!this.allowAnimationUpdate) {
      return;
    }

    // @todo - special effects when it gets low
    // @todo - handle what happens when you hit zero to "kill" the player

    this.setState(this.calculateScoreState(this.props.score));
    window.requestAnimationFrame(() => this.updateScore());
  }

  render() {
    return (
      <ScoreValue
        score={this.state.scoreText}
        effectClass={this.state.effectClass}
      />
    );
  }
}

export default ScoreContainer;
