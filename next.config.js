// next.config.js
const withTypescript = require("@zeit/next-typescript");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

    return config;
  },
  publicRuntimeConfig: {
    clientApiHostname: process.env.CLIENT_API_HOSTNAME,
    appEnv: process.env.APP_ENV,
    appVersion: process.env.APP_VERSION,
    host: process.env.HOSTNAME,
    nodeEnv: process.env.NODE_ENV,
  },
  onDemandEntries: {
    websocketPort: 3007,
  },
});
