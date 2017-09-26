'use strict';

const Express = require('express');
const App = Express();

const serverEntryScript = require('./dist/server.js');
const port = 3000;

serverEntryScript.default(App);

App.listen(port, function () {
  console.log('Webapp listening on port 3000!')
});
