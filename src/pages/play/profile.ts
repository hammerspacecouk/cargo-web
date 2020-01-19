import { Component, createElement } from "react";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getProfile, IProfileResponse } from "../../data/profile";
import { Profile } from "../../components/Pages/Play/Profile";

export class Page extends Component<{ profile: IProfileResponse }, undefined> {
  public static async getInitialProps({ req, res }: NextPageContext) {
    const data = await getProfile(req, res);
    return {
      profile: data,
    };
  }

  public render() {
    return createElement(Profile, this.props);
  }
}

export default GameSessionContainer(Page);
