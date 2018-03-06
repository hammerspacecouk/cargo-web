import * as React from 'react';
import * as Express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import { createStore } from 'redux';

import {EnvironmentStateInterface} from "./State/Environment";
import console from "./Console";
import AppContainer from './Containers/AppContainer';
import Assets from './Helpers/Assets';
import ServerClient, {UserCookieInterface} from "./Data/API/ServerClient";
import reducers from './State';

const assetsManifest = require('../build/assets-manifest.json');

declare namespace Server {
    interface RouterContext {
        url?: string;
        status?: number;
    }
}

const assetPrefix = process.env.APP_ASSET_PREFIX;
const apiHostname = process.env.APP_API_HOSTNAME;
const appVersion = process.env.APP_VERSION;
const appEnv = process.env.APP_ENV;
const host = process.env.HOSTNAME;
const nodeEnv = process.env.NODE_ENV;
const assets = new Assets(assetsManifest, assetPrefix);

const formatUserCookies = (input: any): UserCookieInterface[] => {
    const cookies = [];
    for (let property in input) {
        if (input.hasOwnProperty(property)) {
            const userCookie: UserCookieInterface = {
                name: property,
                value: input[property]
            };

            cookies.push(userCookie);
        }
    }
    return cookies;
};

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
            nodeEnv,

            isClient : false,
            isServer : true,

            apiClient : new ServerClient(apiHostname, formatUserCookies(req.cookies), console),
            assets,
        };

        const store = createStore(reducers, {
            environment
        });
        //
        // Render the component to a string
        const path = req.url;

        const context: Server.RouterContext = {
            url: null,
            status: null,
        };

        let appElement = '';
        try {
            appElement = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter context={context} location={path}>
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
            <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding" rel="stylesheet">
            <link rel="stylesheet" href="${environment.assets.get('app.css')}" />
        </head>
        <body>
        <div id="root">${appElement}</div>
        <script src="${environment.assets.get('manifest.js')}"></script>
        <script src="${environment.assets.get('vendor.js')}"></script>
        <script>
           window.__CONFIG = {
             assetsManifest: ${JSON.stringify(assetsManifest)},
             assetPrefix: '${assetPrefix}',
             apiHostname: '${apiHostname}',
             appVersion: '${appVersion}',
             appEnv: '${appEnv}',
             host: '${host}',
             nodeEnv: '${nodeEnv}'
          };
        
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

        // const code = context.status || 200;
        const code = 200;
        res.status(code);
        res.set({
            'content-type' : 'text/html',
            'cache-control': 'no-cache', // todo - use this: activeRoute.cacheControl,
            'link': [
                `<${environment.assets.get('app.css')}>; rel=preload; as=style`,
                `<${environment.assets.get('manifest.js')}>; rel=preload; as=script`,
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
