import { Component, createElement } from "react";
import { GameSessionContainer } from "../src/contexts/GameSessionContext/GameSessionContainer";
import { LandingPage } from "../src/components/Pages/Play/LandingPage";

class Page extends Component {
  public render() {
    return createElement(LandingPage, this.props);
  }
}

export default GameSessionContainer(Page);
