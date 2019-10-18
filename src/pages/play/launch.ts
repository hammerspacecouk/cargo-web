import { Component, createElement } from "react";
import { LaunchPage } from "../../components/Pages/Play/LaunchPage";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import { LaunchShipsContainer } from "../../contexts/LaunchShipsContext/LaunchShipsContainer";

class Page extends Component {
  public render() {
    return createElement(LaunchPage, this.props);
  }
}

export default GameSessionContainer(LaunchShipsContainer(Page));
