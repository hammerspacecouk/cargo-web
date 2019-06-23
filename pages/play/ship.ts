import { Component, createElement } from "react";
import { GameSessionContainer } from "../../src/contexts/GameSessionContext/GameSessionContainer";

class Page extends Component {
  static async getInitialProps({ query }) {
    console.log('shipId', query.shipId);
    return {};
  }

  public render() {
    return 'HELLO THERE  YRD';
  }
}

export default GameSessionContainer(Page);
