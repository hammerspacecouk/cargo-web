// next.config.js
const dotEnvResult = require('dotenv').config();
const withTM = require('next-transpile-modules')(['three']);

module.exports = withTM({
  env: {
    CLIENT_API_HOSTNAME: process.env.CLIENT_API_HOSTNAME || 'https://api.saxopholis.com',
    SERVER_API_HOSTNAME: process.env.SERVER_API_HOSTNAME || 'https://api.saxopholis.com',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'none',
    APP_VERSION: Date.now(),
    APP_ASSET_PREFIX: process.env.APP_ASSET_PREFIX || 'https://static.saxopholis.com'
  },
  target: 'serverless',
  poweredByHeader: false,
  onDemandEntries: {
    websocketPort: 3007
  },
});
