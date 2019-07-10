import { Component, createElement } from "react";
import { LaunchPage } from "../../src/components/Pages/LaunchPage";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";
import { ApiClient } from "../../src/utils/ApiClient";

class Page extends Component {
  public static async getInitialProps({req, res}) {
    const data = await ApiClient.fetch('/play/inventory', undefined, req && req.headers, res);
    return {
      ships: data.ships
    }
  }

  public render() {
    return createElement(LaunchPage, this.props);
  }
}

export default GameSessionContainer(Page, true);
