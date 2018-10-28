import * as React from "react";
import ChannelInterface from "../../interfaces/ChannelInterface";
import IntervalFormat from "../../components/Formatting/IntervalFormat";
import * as differenceInSeconds from "date-fns/difference_in_seconds";

import { CurrentShipContextInterface } from "../../context/CurrentShipContext";
import { getPlayDataByShipId } from "../../Models/Ship";
import { SessionContext } from "../../context/SessionContext";
import ScoreInterface from "../../interfaces/ScoreInterface";
import RankStatusInterface from "../../interfaces/RankStatusInterface";
import ProgressBar from "../../components/Element/ProgressBar";

interface Props {
  readonly shipContext: CurrentShipContextInterface;
}

interface LocalProps extends Props {
  readonly updateScore: (newScore: ScoreInterface) => void;
  readonly updateRankStatus: (newRankStatus: RankStatusInterface) => void;
}

interface LocalState {
  percent: number;
  secondsRemaining: number;
  isArriving: boolean;
}

class TravellingContainerState extends React.Component<LocalProps, LocalState> {
  private allowAnimationUpdate: boolean;
  private allowArrivalCheck: boolean;

  constructor(props: LocalProps) {
    super(props);
    this.allowAnimationUpdate = false;
    this.allowArrivalCheck = false;
    this.state = this.calculateState(props.shipContext.channel);
  }

  calculateState = (channel: ChannelInterface): LocalState => {
    const now = new Date();
    const start = new Date(channel.startTime);
    const arrival = new Date(channel.arrival);
    const totalSeconds = differenceInSeconds(arrival, start);
    const secondsRemaining = Math.max(0, differenceInSeconds(arrival, now));

    const percent = Math.max(
      0,
      Math.min(100, (totalSeconds - secondsRemaining) / totalSeconds * 100)
    );

    if (
      secondsRemaining <= 0 &&
      this.allowAnimationUpdate &&
      !this.allowArrivalCheck
    ) {
      this.allowAnimationUpdate = false;
      this.allowArrivalCheck = true;
      this.handleArrival();
    }

    return {
      secondsRemaining,
      percent,
      isArriving: !secondsRemaining
    };
  };

  handleArrival = async () => {
    if (!this.allowArrivalCheck) {
      return;
    }
    try {
      const data = await getPlayDataByShipId(this.props.shipContext.ship.id);
      this.props.shipContext.updateFullResponse(data);
      this.props.updateScore(data.playerScore);
      this.props.updateRankStatus(data.playerRankStatus);
      return;
    } catch (e) {
      // do nothing. we'll try again in a moment
    } finally {
      window.setTimeout(() => {
        this.handleArrival();
      }, 3500);
    }
  };

  updateValue = () => {
    if (!this.allowAnimationUpdate) {
      return;
    }

    this.setState(this.calculateState(this.props.shipContext.channel));
    window.requestAnimationFrame(() => this.updateValue());
  };

  componentDidMount() {
    this.allowAnimationUpdate = true;
    window.requestAnimationFrame(() => this.updateValue());
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
    this.allowArrivalCheck = false;
  }

  render() {
    let remaining: any = "Arriving...";
    if (this.state.secondsRemaining) {
      remaining = <IntervalFormat seconds={this.state.secondsRemaining} />;
    }

    return (
      <div>
        <h2>Destination: {this.props.shipContext.channel.destination.name}</h2>
        <h3 className="text--center">{remaining}</h3>
        <ProgressBar percent={this.state.percent} />
      </div>
    );
  }
}

export default (props: Props) => (
  <SessionContext.Consumer>
    {({ updateScore, updateRankStatus }) => (
      <TravellingContainerState
        {...props}
        updateScore={updateScore}
        updateRankStatus={updateRankStatus}
      />
    )}
  </SessionContext.Consumer>
);
