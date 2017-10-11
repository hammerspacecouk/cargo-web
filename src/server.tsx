import * as React from 'react';
import * as Express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import DI, { Services } from './DI';
import App from './App';

import routes, { RouteItem } from './routes';
import {User} from "./models/User";

const assets = require('../build/assets-manifest.json');

// init the DI container specifically with server settings
DI.init(assets);

declare namespace Server {
    interface RouterContext {
        url?: string;
        status?: number;
        initialData?: any;
        user?: User;
    }
}

export default (app: Express.Application) => {

    app.get('*', async (req, res, next) => {
        const start = Date.now();

        // Render the component to a string
        const path = req.url;

        const context: Server.RouterContext = {
            url: null,
            status: null,
            initialData: null,
            user: null,
        };

        let params: object = null;
        const activeRoute = routes.find(
            (route: RouteItem) => {
                const matched = matchPath(path, route);
                if (matched) {
                    params = matched.params;
                    return true;
                }
                return false;
            }
        );

        let appElement;
        try {
            if (activeRoute.login) {
                // get the user object, will be null if not logged in
                // response will include cookies to send
                const user = await Services.user.init(req.cookies);
                if (user) {
                    user.cookies.forEach((cookie) => {
                        res.cookie(cookie.name, cookie.value, cookie.opts);
                    });
                }
                context.user = user;
            }

            if (activeRoute.component.requestInitialData) {
                context.initialData = await activeRoute.component.requestInitialData(params, context.user);
            }

            appElement = ReactDOMServer.renderToString(
                <StaticRouter location={path} context={context}>
                    <App/>
                </StaticRouter>
            );
        } catch (e) {
            const code = context.status || 500;
            res.status(code);
            res.end('Sorry, an error occurred');
            const finish = Date.now() - start;
            DI.logger.error(e);
            DI.logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path} [ERROR] ${context.url}`);
            return;
        }

        if (context.url) {
            const code = context.status || 301;
            res.redirect(
                code,
                context.url
            );
            res.end();
            const finish = Date.now() - start;
            DI.logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path} [REDIRECT] ${context.url}`);
            return;
        }

        const body = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Planet Cargo</title>
            <link rel="stylesheet" href="${DI.getAssets().get('app.css')}" />
        </head>
        <body>
        <div id="root">${appElement}</div>
        <script src="${DI.getAssets().get('vendor.js')}"></script>
        <script>
          window.__ASSETS = ${DI.getAssets().getJSON()};
          window.__DATA = ${await JSON.stringify(context.initialData)};
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
            script.src = '${DI.getAssets().get('app.js')}';
            document.head.appendChild(script);
          }   
        </script>
        </body>
        </html>
    `;

        const code = context.status || 200;
        res.status(code);
        res.set({
            'content-type' : 'text/html', // todo - cache headers
            'cache-control': activeRoute.cacheControl,
            'link': [
                `<${DI.getAssets().get('app.css')}>; rel=preload; as=style`,
                `<${DI.getAssets().get('vendor.js')}>; rel=preload; as=script`,
                `<${DI.getAssets().get('app.js')}>; rel=preload; as=script`,
            ],
        });
        res.end(body);

        const finish = Date.now() - start;
        DI.logger.info(`[RESPONSE] [${code}] [${finish}ms] ${path}`);

        next();
    });

};
