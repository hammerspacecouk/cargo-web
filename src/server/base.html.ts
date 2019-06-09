import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { match, matchPath, StaticRouter } from "react-router-dom";

import { NextFunction, Request, Response } from "express";
import { App } from "../App";
import { CacheType, IRouteItem, matches as routes } from "../routes";
import { Assets } from "../util/Assets";
import { getForClient } from "../util/Environment";
import { Logger } from "../util/Logger";
import { IInitialDataComponent } from "./withInitialData";

interface IMatchedRoute {
  route: IRouteItem;
  match: match;
}

interface IRouterContext {
  url?: string;
  statusCode?: number;
}

const assets = new Assets(
  // tslint:disable-next-line:no-var-requires
  require("../../build/assets-manifest.json"), // todo - bake in using import?
  process.env.APP_ASSET_PREFIX
);

const buildCacheControl = (matched: IMatchedRoute) => {
  let cache: string = CacheType.None;

  if (matched && matched.route) {
    const route = matched.route;
    cache = route.cacheType || CacheType.None;
    if (cache !== CacheType.None) {
      const age = route.maxAge || 600;
      cache = `${cache}, max-age=${age}`;
    }
  }

  return cache;
};

export const handler = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.url;

  // find any initial Data that has to be fetched for the routes
  let matchedRoute: IMatchedRoute;
  routes.forEach(route => {
    const matchedPath = matchPath(path, route);
    // We then look for static getInitialData function on each top level component
    if (matchedPath) {
      matchedRoute = {
        match: matchedPath,
        route,
      };
    }
  });

  const context: IRouterContext = {
    statusCode: null,
    url: null,
  };

  let appElement = "";
  let data;

  try {
    if (matchedRoute && (matchedRoute.route.component as IInitialDataComponent).getInitialData) {
      data = await (matchedRoute.route.component as IInitialDataComponent).getInitialData(matchedRoute.match, req);
    }

    appElement = renderToString(
      createElement(StaticRouter, { context, location: path }, createElement(App, { routes, initialData: data }))
    );

    if (context.url) {
      const code = context.statusCode || 301;
      res.redirect(code, context.url);
      res.end();
      const finish = Date.now() - start;
      Logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path} [REDIRECT] ${context.url}`);
      next();
      return;
    }

    const code = context.statusCode || 200;
    res.status(code);
    res.set({
      "cache-control": buildCacheControl(matchedRoute),
      "content-type": "text/html",
      link: [
        `<${assets.get("app.css")}>; rel=preload; as=style`,
        `<${assets.get("vendor.js")}>; rel=preload; as=script`,
        `<${assets.get("app.js")}>; rel=preload; as=script`,
      ],
    });
    res.end(
      html({
        assetsManifest: assets,
        config: getForClient(),
        content: appElement,
        data,
      })
    );

    const finish = Date.now() - start;
    Logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path}`);

    next();
  } catch (error) {
    res.status(500);
    res.set({
      "cache-control": CacheType.None,
      "content-type": "text/html",
    });
    res.end(`Sorry, an error occurred. Please <a href=".">try again</a>`);
    const finish = Date.now() - start;
    Logger.error(error);
    Logger.info(`[RESPONSE] [500] [${finish}ms] ${path} [ERROR] ${path}`);
    next();
    return;
  }
};

interface IHTML {
  config: object;
  assetsManifest: Assets;
  content: any;
  data?: any;
  title?: string;
}

const html = ({ config, assetsManifest, content, data, title = null }: IHTML) => `<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title ? `${title} | ` : ""}Planet Cargo</title>
</head>
<body>
<div id="root" style="min-height:100vh">${content}</div>
<script src="${assetsManifest.get("vendor.js")}"></script>
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
    script.src = '${assetsManifest.get("app.js")}';
    document.head.appendChild(script);
  }
</script>
</body>
</html>
`;
