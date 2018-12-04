import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { match, matchPath, StaticRouter } from "react-router";

import { CacheType, matches as routes, RouteItem } from "../routes";
import { InitialDataComponent } from "./withInitialData";
import App from "../App";
import { Logger } from "../util/Logger";
import { getForClient } from "../util/Environment";
import Assets from "../util/Assets";
import { NextFunction, Request, Response } from "express";

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
  require("../../build/assets-manifest.json"),
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

export const handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    appElement = renderToString(
      createElement(
        StaticRouter,
        { context, location: path },
        createElement(App, { routes, initialData: data })
      )
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
    res.end(
      html({
        config: getForClient(),
        assets,
        content: appElement,
        data
      })
    );

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
};

interface HTMLInterface {
  config: object;
  assets: Assets;
  content: any;
  data?: any;
  title?: string;
}

const html = ({
  config,
  assets,
  content,
  data,
  title = null
}: HTMLInterface) => `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title ? `${title} | ` : ""}Planet Cargo</title>
    <link rel="stylesheet" href="${assets.get("app.css")}" />
</head>
<body>
<div id="root">${content}</div>
<script src="${assets.get("vendor.js")}"></script>
<script>
  window._CONFIG_ = ${JSON.stringify(config)};
  window._INITIAL_DATA_ = ${JSON.stringify(data)};

  const supportsES6 = function() {
    try {
      new Function("(a = 0) => a");
      return true;
    } catch (e) {
      return false;
    }
  }();
  if (supportsES6) {
    let script = document.createElement('script');
    script.src = '${assets.get("app.js")}';
    document.head.appendChild(script);
  }
</script>
</body>
</html>
`;
