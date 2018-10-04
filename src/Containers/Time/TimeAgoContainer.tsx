import * as React from "react";

interface Props {
  datetime: Date;
}

interface LocalState {
  text: string;
}

const getValue = (datetime: Date, now: Date): string => {
  const seconds = Math.floor((now.getTime() - datetime.getTime()) / 1000);

  if (seconds > 60 * 60 * 24 * 28) {
    return datetime.toLocaleString();
  }
  let interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }

  if (Math.floor(seconds) <= 1) {
    return "Just now";
  }
  return Math.floor(seconds) + " seconds ago";
};

export default class TimeAgoContainer extends React.Component<
  Props,
  LocalState
> {
  private allowAnimationUpdate: boolean;

  constructor(props: Props) {
    super(props);
    this.allowAnimationUpdate = false;
    this.state = this.calculate();
  }

  calculate = (): LocalState => {
    return {
      text: getValue(this.props.datetime, new Date())
    };
  };

  updateText = (): void => {
    if (!this.allowAnimationUpdate) {
      return;
    }
    this.setState(this.calculate());
    window.requestAnimationFrame(this.updateText);
  };

  componentDidMount() {
    this.allowAnimationUpdate = true;
    this.updateText();
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
  }

  render() {
    return (
      <time
        dateTime={this.props.datetime.toISOString()}
        title={this.props.datetime.toISOString()}
      >
        {this.state.text}
      </time>
    );
  }
}
