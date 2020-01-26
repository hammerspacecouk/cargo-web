import { Component, createElement } from "react";
import {ILaunchPageProps, LaunchPage} from "../../components/Pages/Play/LaunchPage";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import {NextPageContext} from "next";
import {getAvailableShips} from "../../data/launch-ships";

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

export default GameSessionContainer(Page);
