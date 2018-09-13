import * as React from "react";
import * as Express from "express";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import {
  getForClient,
  injectUserCookiesFromRequest
} from "./Infrastructure/Environment";
import Logger from "./Infrastructure/Logger";
import AppContainer from "./Containers/AppContainer";
import Assets from "./Utils/Assets";

declare namespace Server {
  interface RouterContext {
    url?: string;
    status?: number;
  }
}

const assets = new Assets(
  require("../build/assets-manifest.json"),
  process.env.APP_ASSET_PREFIX
);

export default (app: Express.Application) => {
  app.get("*", async (req, res, next) => {
    const start = Date.now();
    injectUserCookiesFromRequest(req.cookies);

    // Render the component to a string
    const path = req.url;

    const context: Server.RouterContext = {
      url: null,
      status: null
    };

    let appElement = "";
    try {
      appElement = ReactDOMServer.renderToString(
        <StaticRouter context={context} location={path}>
          <AppContainer />
        </StaticRouter>
      );
    } catch (e) {
      const code = context.status || 500;
      res.status(code);
      res.end("Sorry, an error occurred");
      const finish = Date.now() - start;
      Logger.error(e);
      Logger.info(
        `[RESPONSE] [${code}] [${finish}ms] ${path} [ERROR] ${context.url}`
      );
      return;
    }

    if (context.url) {
      const code = context.status || 301;
      res.redirect(code, context.url);
      res.end();
      const finish = Date.now() - start;
      Logger.info(
        `[RESPONSE] [${code}] [${finish}ms] ${path} [REDIRECT] ${context.url}`
      );
      return;
    }

    const body = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Planet Cargo</title>
            <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding" rel="stylesheet">
            <link rel="stylesheet" href="${assets.get("app.css")}" />
        </head>
        <body>
        <div id="root">${appElement}</div>
        <script src="${assets.get("manifest.js")}"></script>
        <script src="${assets.get("vendor.js")}"></script>
        <script>
          window.__CONFIG = ${JSON.stringify(getForClient())};
        
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

    // const code = context.status || 200;
    const code = 200;
    res.status(code);
    res.set({
      "content-type": "text/html",
      "cache-control": "no-cache", // todo - use this: activeRoute.cacheControl,
      link: [
        `<${assets.get("app.css")}>; rel=preload; as=style`,
        `<${assets.get("manifest.js")}>; rel=preload; as=script`,
        `<${assets.get("vendor.js")}>; rel=preload; as=script`,
        `<${assets.get("app.js")}>; rel=preload; as=script`
      ]
    });
    res.end(body);

    const finish = Date.now() - start;
    Logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path}`);

    next();
  });
};
