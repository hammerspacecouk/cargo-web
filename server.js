'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

// Server-side Entry
const serverEntry = require('./dist/server.js');

// basic HTTP server via express:
const app = express();

const BUNDLE_FILE_URL = '/client.js';
const BUNDLE_FILE_PATH = path.join(__dirname, `dist${BUNDLE_FILE_URL}`);

// bundle js file
app.get(BUNDLE_FILE_URL, (req, res) => {
  fs.readFile(BUNDLE_FILE_PATH, 'utf-8', (err, ctx) => {
  res.send(ctx);
});
});

// on each request, render and return a component:
app.get('/', (req, res) => {

const serverResult = serverEntry.default({
    // id,
    name: 'Hans',
    age: Math.round(Math.random() * 50),
  });
// send it back wrapped up as an HTML5 document:
res.send(`<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Planet Cargo</title>
</head>
<body>
<div id="root">${serverResult.html}</div>
<script>window.__state_data__ = ${JSON.stringify(serverResult.state)};</script>
<script src="/client.js"></script>
</body>
</html>`);
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Preact Server start on ${PORT}`);
});
