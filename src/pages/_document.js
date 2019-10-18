import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { Environment } from "../utils/environment";

import { ServerStyleSheet } from "styled-components";

// noinspection JSUnusedGlobalSymbols
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{__html: `
              /* share-tech-mono-400normal - latin */
              @font-face {
                font-family: "Share Tech Mono";
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local("Share Tech Mono Regular "), local("Share Tech Mono-Regular"),
                  url("${Environment.assetPrefix}/share-tech-mono-latin-400.1.woff2") format("woff2");
              }
          `}}/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}
