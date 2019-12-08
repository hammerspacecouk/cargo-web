import { Component, createElement } from "react";
import { LandingPage } from "../components/Pages/Play/LandingPage";
import { GameSessionContainer } from "../contexts/GameSessionContext/GameSessionContainer";
import { IProfileResponse } from "../data/profile";

export class Page extends Component<{ profile?: IProfileResponse }, undefined> {
  public render() {
    return createElement(LandingPage);
  }
}

export default GameSessionContainer(Page, true);
