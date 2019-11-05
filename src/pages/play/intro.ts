import { Component, createElement } from "react";
import { GameSessionContainer } from "../../contexts/GameSessionContext/GameSessionContainer";
import { IntroPage } from "../../components/Pages/Play/IntroPage";
import { NextPageContext } from "next";
import { IGameSessionResponse } from "../../data/game";

class Page extends Component<{ isRedirecting?: boolean }, undefined> {
  public static getInitialProps({ query, req, res }: NextPageContext, sessionData?: IGameSessionResponse) {
    let isRedirecting = false;
    if (sessionData?.sessionState.rankStatus.previousRank) {
      const redirectTo = "/play";
      if (res) {
        res.writeHead(302, {
          Location: redirectTo,
        });
        res.end();
      }
    }
    return {
      isRedirecting,
    };
  }

  public render() {
    if (this.props.isRedirecting) {
      return null;
    }
    return createElement(IntroPage);
  }
}

export default GameSessionContainer(Page);
