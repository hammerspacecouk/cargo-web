import * as React from "react";
import * as Express from "express";
import * as ReactDOMServer from "react-dom/server";
import { match, matchPath, StaticRouter } from "react-router-dom";

import { getForClient } from "./Infrastructure/Environment";
import Logger from "./Infrastructure/Logger";
import AppContainer from "./Containers/AppContainer";
import Assets from "./Utils/Assets";

import { CacheType, RouteItem, matches as routes } from "./routes";
import html from "./index.html";
import { InitialDataComponent } from "./Components/withInitialData";

interface MatchedRoute {
  route: RouteItem;
  match: match;
}

declare namespace Server {
  interface RouterContext {
    url?: string;
    statusCode?: number;
  }
}

const assets = new Assets(
  require("../build/assets-manifest.json"),
  process.env.APP_ASSET_PREFIX
);

const buildCacheControl = (matched: MatchedRoute) => {
  let cache: string = CacheType.None;

  if (matched && matched.route) {
    const route = matched.route;
    cache = route.cacheType || CacheType.None;
    if (cache !== CacheType.None) {
      let age = route.maxAge || 600;
      cache = `${cache}, max-age=${age}`;
    }
  }

  return cache;
};

export default (app: Express.Application) => {
  app.get("*", async (req, res, next) => {
    const start = Date.now();
    const path = req.url;

    // find any initial Data that has to be fetched for the routes
    let matchedRoute: MatchedRoute;
    routes.forEach(route => {
      const match = matchPath(path, route);
      // We then look for static getInitialData function on each top level component
      if (match) {
        matchedRoute = {
          route,
          match
        };
      }
    });

    const context: Server.RouterContext = {
      url: null,
      statusCode: null
    };

    let appElement = "";
    let data;

    try {
      if (
        matchedRoute &&
        (matchedRoute.route.component as InitialDataComponent).getInitialData
      ) {
        data = await (matchedRoute.route
          .component as InitialDataComponent).getInitialData(
          matchedRoute.match,
          req
        );
      }

      appElement = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={path}>
          <AppContainer routes={routes} initialData={data} />
        </StaticRouter>
      );

      if (context.url) {
        const code = context.statusCode || 301;
        res.redirect(code, context.url);
        res.end();
        const finish = Date.now() - start;
        Logger.info(
          `[RESPONSE] [${code}] [${finish}ms] ${path} [REDIRECT] ${context.url}`
        );
        next();
        return;
      }

      const code = context.statusCode || 200;
      res.status(code);
      res.set({
        "content-type": "text/html",
        "cache-control": buildCacheControl(matchedRoute),
        link: [
          `<${assets.get("app.css")}>; rel=preload; as=style`,
          `<${assets.get("vendor.js")}>; rel=preload; as=script`,
          `<${assets.get("app.js")}>; rel=preload; as=script`
        ]
      });
      res.end(html(getForClient(), assets, appElement, data));

      const finish = Date.now() - start;
      Logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path}`);

      next();
    } catch (error) {
      res.status(500);
      res.set({
        "content-type": "text/html",
        "cache-control": CacheType.None
      });
      res.end(`Sorry, an error occurred. Please <a href=".">try again</a>`);
      const finish = Date.now() - start;
      Logger.error(error);
      Logger.info(`[RESPONSE] [500] [${finish}ms] ${path} [ERROR] ${path}`);
      next();
      return;
    }
  });
};
