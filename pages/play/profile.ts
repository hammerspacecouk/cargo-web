import { Component, createElement } from "react";
import { LandingPage } from "../../src/components/Pages/Play/LandingPage";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getProfile } from "../../src/data/profile";

export class Page extends Component {
  public static async getInitialProps({ req, res }: NextPageContext) {
    const data = await getProfile(req, res);
    return {
      profile: data,
    };
  }

  public render() {
    return createElement(LandingPage, this.props);
  }
}

export default GameSessionContainer(Page);
