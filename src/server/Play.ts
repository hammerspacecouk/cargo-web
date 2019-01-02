import { Component, createElement } from "react";
import { AppLoading } from "../pages/Play/AppLoading";
import { PlayPage } from "../pages/PlayPage";

interface IState {
  appReady: boolean;
}

// The server rendered game just shows a "JavaScript required" view
export class Play extends Component<undefined, IState> {
  public state = {
    appReady: false,
  };

  public componentDidMount() {
    this.setState({
      appReady: true,
    });
  }

  public render() {
    if (!this.state.appReady) {
      return createElement(AppLoading);
    }
    return createElement(PlayPage);
  }
}
