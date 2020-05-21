import { Component, createElement } from "react";
import { GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getProfile, IProfileResponse } from "@src/data/profile";
import { Profile } from "@src/components/Pages/Play/Profile";

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
