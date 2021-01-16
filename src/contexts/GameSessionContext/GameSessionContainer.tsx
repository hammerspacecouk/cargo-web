import React, { Component } from "react";
import { GameContextComponent } from "./GameSessionContext";
import { errorIs, UNAUTHENTICATED_ERROR, UnauthenticatedError } from "@src/utils/HttpClient/Error";
import { PlayContainer } from "@src/components/Pages/PlayContainer";
import { NextPageContext } from "next";
import { getSession, IGameSessionResponse } from "@src/data/game";
import { routes } from "@src/routes";
import { AUTH_COOKIE_NAME } from "@src/utils/HttpClient/ServerClient";

export enum CurrentPage {
  home,
  launch,
}

// responsible for fetching the data required for this context
export const GameSessionContainer = (Page: any, currentPage: CurrentPage = null) => {
  return class extends Component<IProps, undefined> {
    public static async getInitialProps(context: NextPageContext) {
      return calculateInitialProps(context, Page);
    }

    public render() {
      const { gameSession, page } = this.props;

      return (
        <GameContextComponent currentPage={currentPage} initialSession={gameSession}>
          <PlayContainer>
            <Page {...page} />
          </PlayContainer>
        </GameContextComponent>
      );
    }
  };
};

interface IProps {
  gameSession?: IGameSessionResponse;
  page: any;
}

const calculateInitialProps = async (context: NextPageContext, Page: any): Promise<IProps> => {
  const { req, res } = context;
  let initialProps: IProps = {
    gameSession: undefined,
    page: {},
  };

  try {
    // save an unnecessary call to the API if we already know the cookie isn't there
    if (req?.headers && (!req.headers.cookie || !req.headers.cookie.includes(AUTH_COOKIE_NAME))) {
      throw UnauthenticatedError("Cookie not found");
    }
    // get the gameSession data
    initialProps.gameSession = await getSession(req, res);

    // get the sub-page data
    if (Page.getInitialProps) {
      initialProps.page = await Page.getInitialProps(context, initialProps.gameSession);
    }
    return initialProps;
  } catch (err) {
    // redirect unauthenticated to the login page
    if (errorIs(err, UNAUTHENTICATED_ERROR)) {
      res.writeHead(302, {
        Location: `${routes.getLogin()}?r=${encodeURIComponent(req.url)}`,
      });
      res.end();
      return initialProps;
    }
    throw err;
  }
};
