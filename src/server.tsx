import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './App';

// todo - create the DI container, so that I have the assets manifest

declare namespace Server {
    interface RouterContext {
        url?: string;
        statusCode?: number;
    }

    interface ResponseData {
        statusCode: number;
        headers: object;
        body?: string;
    }
}

export default (path: string): Server.ResponseData => {
    // Render the component to a string

    const context: Server.RouterContext = {
        url: null,
        statusCode: null
    };

    const appElement = ReactDOMServer.renderToString(
        <StaticRouter location={path} context={context}>
            <App name="Server" />
        </StaticRouter>
    );

    if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return {
            statusCode: context.statusCode || 301,
            headers: {
                location: context.url
            },
            body: null
        };
    }

    const body = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Planet Cargo</title>
        </head>
        <body>
        <div id="root">${appElement}</div>
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
        </html>
    `;

    return {
        statusCode: 200, // todo - read from routes and queries
        headers: {
            'content-type' : 'text/html', // todo - cache headers
            'cache-control': 'private'
        },
        body
    };
};
