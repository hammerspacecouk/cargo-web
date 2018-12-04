import PlayPage from "../pages/PlayPage";
import { Component, createElement } from "react";
import AppLoading from "../pages/Play/AppLoading";

interface StateInterface {
  appReady: boolean;
}

// The server rendered game just shows a "JavaScript required" view
class PlayComponent extends Component<undefined, StateInterface> {
  state = {
    appReady: false
  };

  componentDidMount() {
    this.setState({
      appReady: true
    });
  }

  render() {
    if (!this.state.appReady) {
      return createElement(AppLoading);
    }
    return createElement(PlayPage);
  }
}

export default PlayComponent;
