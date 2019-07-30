import { Component, createElement } from "react";
import { LaunchPage } from "../../src/components/Pages/Play/LaunchPage";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";
import { LaunchShipsContainer } from "../../src/contexts/LaunchShipsContext/LaunchShipsContainer";

class Page extends Component {
  public render() {
    return createElement(LaunchPage, this.props);
  }
}

export default GameSessionContainer(LaunchShipsContainer(Page));
