'use strict';

const Express = require('express');
const CookieParser = require('cookie-parser');
const App = Express();

const serverEntryScript = require('./build/server.js');
const port = 3000;

App.use(CookieParser());
serverEntryScript.default(App);

App.listen(port, function () {
  console.log('Webapp listening on port 3000!')
});
