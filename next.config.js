// next.config.js
module.exports = {
  target: 'serverless',
  poweredByHeader: false,
  // publicRuntimeConfig: {
  //   clientApiHostname: process.env.CLIENT_API_HOSTNAME,
  //   appEnv: process.env.APP_ENV,
  //   appVersion: process.env.APP_VERSION,
  //   host: process.env.HOSTNAME,
  //   nodeEnv: process.env.NODE_ENV
  // },
  onDemandEntries: {
    websocketPort: 3007
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    );
    return config;
  }
};
