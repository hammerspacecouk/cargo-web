// next.config.js
module.exports = {
  poweredByHeader: false,
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
};
