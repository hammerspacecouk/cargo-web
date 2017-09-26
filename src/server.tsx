import * as React from 'react';
import * as Express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './App';

// todo - create the DI container, so that I have the assets manifest

declare namespace Server {
    interface RouterContext {
        url?: string;
        statusCode?: number;
    }
}

export default (app: Express.Application) => {

    app.get('*', (req, res) => {
        const path = req.url;
        const context: Server.RouterContext = {
            url: null,
            statusCode: null
        };

        res.set({
            'content-type' : 'text/html', // todo - cache headers
            'cache-control': 'private',
            'link': [
                `</static/styles.css>; rel=preload; as=style`,
                `</static/vendor.js>; rel=preload; as=script`,
                `</static/client.js>; rel=preload; as=script`,
            ],
        });
        const stream = ReactDOMServer.renderToNodeStream(
            <StaticRouter location={path} context={context}>
                <App name="Server" />
            </StaticRouter>
        );
        res.write(`<!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Planet Cargo</title>
            </head>
            <body>
            <div id="root">`
        );
        stream.pipe(res, { end: false });
        stream.on('end', () => {
            res.write(`</div>
                <script src="/static/vendor.js"></script>
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
                    script.src = "/static/client.js";
                    document.head.appendChild(script);
                  }   
                </script>
                </body>
                </html>`
            );
            res.end();
        });
    });
};
