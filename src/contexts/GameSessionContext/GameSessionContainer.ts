import { Component, createElement } from "react";
import { GameContextComponent } from "./GameSessionContext";
import { errorIs, UNAUTHENTICATED_ERROR, UnauthenticatedError } from "../../utils/HttpClient/Error";
import { PlayContainer } from "../../components/Pages/PlayContainer";
import { IPageWithData } from "../../interfaces";
import { NextPageContext } from "next";
import { getSession, IGameSessionResponse } from "../../data/game";
import { routes } from "../../routes";
import { AUTH_COOKIE_NAME } from "../../utils/HttpClient/ServerClient";

// responsible for fetching the data required for this context
export const GameSessionContainer = (Page: IPageWithData, isAtHome: boolean = false) => {
  return class extends Component<IProps, undefined> {
    public static async getInitialProps(context: NextPageContext) {
      return calculateInitialProps(context, Page);
    }

    public render() {
      const { gameSession, page } = this.props;
      // set the main page props
      const HydratedPage = createElement(Page, page);

      // add page furniture
      const Container = createElement(PlayContainer, null, HydratedPage);

      // add the context
      return createElement(GameContextComponent, { initialSession: gameSession, isAtHome }, Container);
    }
  };
};

interface IProps {
  gameSession?: IGameSessionResponse;
  page: any;
}

const calculateInitialProps = async (context: NextPageContext, Page: IPageWithData): Promise<IProps> => {
  const { req, res } = context;
  let initialProps: IProps = {
    gameSession: undefined,
    page: {},
  };

  try {
    // save an unnecessary call to the API if we already know the cookie isn't there
    if (req && req.headers && (!req.headers.cookie || !req.headers.cookie.includes(AUTH_COOKIE_NAME))) {
      throw UnauthenticatedError("Cookie not found");
    }
    // get the gameSession data
    initialProps.gameSession = await getSession(req, res);

    // get the sub-page data
    if (Page.getInitialProps) {
      initialProps.page = await Page.getInitialProps(context);
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
