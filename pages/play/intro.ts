import { Component, createElement } from "react";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";
import { IntroPage } from "../../src/components/Pages/Play/IntroPage";

class Page extends Component {
  public render() {
    return createElement(IntroPage, this.props);
  }
}

export default GameSessionContainer(Page);
