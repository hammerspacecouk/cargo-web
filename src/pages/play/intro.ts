import { Component, createElement } from "react";
import { GameSessionContainer } from "@src/contexts/GameSessionContext/GameSessionContainer";
import { IntroPage } from "@src/components/Pages/Play/IntroPage";
import { NextPageContext } from "next";
import { IGameSessionResponse } from "@src/data/game";

class Page extends Component<{ isRedirecting?: boolean }, undefined> {
  public static getInitialProps({ query, req, res }: NextPageContext, sessionData?: IGameSessionResponse) {
    const isRedirecting = false;
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
