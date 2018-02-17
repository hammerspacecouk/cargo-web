'use strict';

const Express = require('express');
const CookieParser = require('cookie-parser');
const app = Express();

const serverEntryScript = require('./build/server.js');
const port = 3000;

app.disable('x-powered-by'); // no need to tell the world what technology to attack
app.use(CookieParser());
serverEntryScript.default(app);

app.listen(port, () => console.log(`Webapp listening on port ${port}`));
