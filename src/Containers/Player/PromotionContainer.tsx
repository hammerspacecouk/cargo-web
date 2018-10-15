import * as React from "react";
import RankStatusInterface from "../../DomainInterfaces/RankStatusInterface";
import ProgressBar from "../../Components/Element/ProgressBar";

interface Props {
  rankStatus?: RankStatusInterface;
}

interface LocalState {
  previousClass: string;
  previousActive: boolean;
  nextActive: boolean;
  progress: number;
}

class PromotionContainer extends React.Component<Props, LocalState> {
  private allowAnimationUpdate: boolean;
  private startTime: number = null;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = {
      previousClass: "",
      previousActive: true,
      nextActive: false,
      progress: 80
    };

    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.allowAnimationUpdate = true;
    window.requestAnimationFrame(this.animate);
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
    this.startTime = null;
  }

  animate(stamp: number) {
    if (!this.allowAnimationUpdate) {
      return;
    }

    if (!this.startTime) {
      this.startTime = stamp;
    }

    const diff = stamp - this.startTime;

    let progress = this.state.progress;
    // todo - numbers as constants
    if (diff > 500 && diff < 2500) {
      progress = 100;
    } else if (diff >= 2500) {
      progress = 2;
    }

    // todo - *ping* on new rank

    this.setState({
      previousClass: diff > 1000 ? "o-promotion__previous--go" : "",
      previousActive: diff < 2500,
      nextActive: diff >= 2500,
      progress
    });
    window.requestAnimationFrame(this.animate);
  }

  render() {
    if (!this.props.rankStatus) {
      return null;
    }

    let previous = null;
    let next = null;

    if (this.state.previousActive) {
      previous = (
        <div className={`o-promotion__previous ${this.state.previousClass}`}>
          {this.props.rankStatus.previousRank.title}
        </div>
      );
    }

    if (this.state.nextActive) {
      previous = (
        <div className="o-promotion__current">
          {this.props.rankStatus.currentRank.title}
        </div>
      );
    }

    return (
      <div className="o-promotion">
        <div className="o-promotion__rank-box">
          {previous}
          {next}
        </div>

        <div className="o-promotion__progress">
          <ProgressBar percent={this.state.progress} />
        </div>

        <p>Share this:</p>
        {/* todo - links to this users public page */}
        <p>Facebook</p>
        <p>Twitter</p>
      </div>
    );
  }
}

export default PromotionContainer;
