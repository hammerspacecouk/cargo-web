import { Component, createElement } from "react";
import { ILaunchPageProps, LaunchPage } from "@src/components/Pages/Play/LaunchPage";
import { CurrentPage, GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { NextPageContext } from "next";
import { getAvailableShips } from "@src/data/launch-ships";

class Page extends Component<ILaunchPageProps> {
  public static async getInitialProps({ req, res }: NextPageContext) {
    const data = await getAvailableShips(req, res);
    return {
      shipUpgrades: data.ships,
    };
  }

  public render() {
    return createElement(LaunchPage, this.props);
  }
}

export default GameSessionContainer(Page, CurrentPage.launch);
