import { Component, createElement } from "react";
import { LandingPage } from "../../components/Pages/Play/LandingPage";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getProfile, IProfileResponse } from "../../data/profile";

export class Page extends Component<{ profile?: IProfileResponse }> {
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
