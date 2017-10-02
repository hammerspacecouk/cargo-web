import * as React from 'react';
import * as Express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import DI from './DI';
import App from './App';

import routes, { RouteConfig } from './routes';

// init the DI container specifically with server settings
DI.init(require('../build/assets-manifest.json'));

declare namespace Server {
    interface RouterContext {
        url?: string;
        status?: number;
        initialData?: any;
    }
}

export default (app: Express.Application) => {

    app.get('*', async (req, res) => {
        // Render the component to a string
        const path = req.url;
        const context: Server.RouterContext = {
            url: null,
            status: null,
            initialData: null,
        };

        let params: object;
        const activeRoute = routes.find(
            (route: RouteConfig) => {
                const matched = matchPath(path, route);
                if (matched) {
                    params = matched.params;
                    return true;
                }
                return false;
            }
        );

        if (activeRoute.component.requestInitialData) {
            context.initialData = await activeRoute.component.requestInitialData(params);
        }

        const appElement = ReactDOMServer.renderToString(
            <StaticRouter location={path} context={context}>
                <App />
            </StaticRouter>
        );

        if (context.url) {
            res.redirect(
                context.status || 301,
                context.url
            );
            res.end();
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

        res.status(context.status || 200);
        res.set({
            'content-type' : 'text/html', // todo - cache headers
            'cache-control': 'private',
            'link': [
                `<${DI.getAssets().get('app.css')}>; rel=preload; as=style`,
                `<${DI.getAssets().get('vendor.js')}>; rel=preload; as=script`,
                `<${DI.getAssets().get('app.js')}>; rel=preload; as=script`,
            ],
        });
        res.end(body);
    });
};
