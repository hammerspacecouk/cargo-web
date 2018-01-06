import * as React from 'react';
import * as Express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import { createStore } from 'redux';

import {EnvironmentStateInterface} from "./State/Environment";
import console from "./Console";
import AppContainer from './Containers/AppContainer';
import Assets from './Domain/Assets';
import ServerClient from "./Data/API/ServerClient";
import reducers from './State';

const assetsManifest = require('../build/assets-manifest.json');

declare namespace Server {
    interface RouterContext {
        url?: string;
        status?: number;
    }
}

const assetPrefix = process.env.assetPrefix; // todo - check
const apiHostname = process.env.apiHostname; // todo - check
const appVersion = process.env.appVersion; // todo - check
const appEnv = process.env.appEnv; // todo - check
const host = process.env.host; // todo - check
const assets = new Assets(assetsManifest, apiHostname);

export default (app: Express.Application) => {

    app.get('*', async (req, res, next) => {
        const start = Date.now();

        const environment: EnvironmentStateInterface = {
            assetsManifest,
            assetPrefix,
            apiHostname,
            appVersion,
            appEnv,
            host,

            isClient : false,
            isServer : true,

            apiClient : new ServerClient(apiHostname, [], console), // todo - get real cookies
            assets,
        };

        const store = createStore(reducers, {
            environment
        });

        // Render the component to a string
        const path = req.url;
        //
        const context: Server.RouterContext = {
            url: null,
            status: null, // todo - how do we get these back out of the application?
        };

        let appElement;
        try {
            appElement = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter location={path}>
                        <AppContainer />
                    </StaticRouter>
                </Provider>
            );
        } catch (e) {
            const code = context.status || 500;
            res.status(code);
            res.end('Sorry, an error occurred');
            const finish = Date.now() - start;
            console.error(e);
            console.info(`[RESPONSE] [${code}] [${finish}ms] ${path} [ERROR] ${context.url}`);
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
            console.info(`[RESPONSE] [${code}] [${finish}ms] ${path} [REDIRECT] ${context.url}`);
            return;
        }

        const body = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Planet Cargo</title>
            <link rel="stylesheet" href="${environment.assets.get('app.css')}" />
        </head>
        <body>
        <div id="root">${appElement}</div>
        <script src="${environment.assets.get('vendor.js')}"></script>
        <script>
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
            script.src = '${environment.assets.get('app.js')}';
            document.head.appendChild(script);
          }
        </script>
        </body>
        </html>
    `;

        const code = context.status || 200;
        res.status(code);
        res.set({
            'content-type' : 'text/html',
            'cache-control': 'no-cache', // todo - use this: activeRoute.cacheControl,
            'link': [
                `<${environment.assets.get('app.css')}>; rel=preload; as=style`,
                `<${environment.assets.get('vendor.js')}>; rel=preload; as=script`,
                `<${environment.assets.get('app.js')}>; rel=preload; as=script`,
            ],
        });
        res.end(body);

        const finish = Date.now() - start;
        console.info(`[RESPONSE] [${code}] [${finish}ms] ${path}`);

        next();
    });

};
