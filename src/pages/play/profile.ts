import { Component, createElement } from "react";
import { GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getProfile } from "@src/data/profile";
import { IProfileProps, Profile } from "@src/components/Pages/Play/Profile";
import { ApiClient } from "@src/utils/ApiClient";

export class Page extends Component<IProfileProps, undefined> {
  public static async getInitialProps({ req, res, query }: NextPageContext) {
    const purchaseId = (query.purchaseId as string) || null;
    let purchaseState;
    if (purchaseId) {
      const response = await ApiClient.fetch(`/purchase/${purchaseId}`, undefined, req);
      purchaseState = !!response;
    }

    const data = await getProfile(req, res);
    return {
      profile: data,
      purchaseState,
    };
  }

  public render() {
    return createElement(Profile, this.props);
  }
}

export default GameSessionContainer(Page);
