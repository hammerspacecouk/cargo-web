import React from "react";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { Environment } from "../utils/environment";

import { ServerStyleSheet } from "styled-components";

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="1024x1024" href="/_static/app-icons/1024x1024.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/_static/app-icons/180x180.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/_static/app-icons/32x32.png" />
          <link rel="mask-icon" color="#1a1f22" href="/_static/app-icons/safari-pinned-tab.svg" />
          <link rel="shortcut icon" type="image/x-icon" href="/_static/app-icons/32x32.png" />
          <link rel="icon" type="image/x-icon" href="/_static/app-icons/32x32.png" />
          <meta name="apple-mobile-web-app-title" content="Saxopholis" />
          <meta name="application-name" content="Saxopholis" />
          <meta name="theme-color" content="#1a1f22" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
              /* share-tech-mono-400normal - latin */
              @font-face {
                font-family: "Share Tech Mono";
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local("Share Tech Mono Regular "), local("Share Tech Mono-Regular"),
                  url("${Environment.assetPrefix}/share-tech-mono-latin-400.1.woff2") format("woff2");
              }
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
