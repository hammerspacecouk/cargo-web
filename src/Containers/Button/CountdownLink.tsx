import * as React from "react";

interface Props {
  readonly time: number;
  readonly children: any;
  readonly href: string;
  readonly className: string;
}

interface LocalState {
  disabled: boolean;
  time: number;
}

export default class CountdownLink extends React.Component<Props, LocalState> {
  private allowAnimationUpdate: boolean;
  private start: number = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      time: this.formatTime(props.time),
      disabled: true
    };
  }

  formatTime = (msTime: number) => {
    return Math.ceil(msTime / 1000);
  };

  frame = (frameTime: number) => {
    if (!this.start) {
      this.start = frameTime;
    }
    const timePassed = frameTime - this.start;
    const timeRemaining = Math.max(0, this.props.time - timePassed);
    const finished = timeRemaining <= 0;
    this.setState({
      time: this.formatTime(timeRemaining),
      disabled: !finished
    });
    if (!finished) {
      window.requestAnimationFrame(this.frame);
    }
  };

  componentDidMount() {
    this.allowAnimationUpdate = true;
    window.requestAnimationFrame(this.frame);
  }

  componentWillUnmount() {
    this.allowAnimationUpdate = false;
  }

  render() {
    if (this.state.disabled) {
      return (
        <button className={this.props.className} disabled={this.state.disabled}>
          {this.props.children} ({this.state.time})
        </button>
      );
    }

    return (
      <a href={this.props.href} className={this.props.className}>
        {this.props.children}
      </a>
    );
  }
}
