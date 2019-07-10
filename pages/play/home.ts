import { Component, createElement } from "react";
import { LandingPage } from "../../src/components/Pages/Play/LandingPage";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";

class Page extends Component {
  public render() {
    return createElement(LandingPage, this.props);
  }
}

export default GameSessionContainer(Page);
