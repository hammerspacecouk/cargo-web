'use strict';

const fs = require('fs');
const http = require('http');
const url = require('url');
const serverEntryScript = require('./dist/server.js');
const port = 3000;

http.createServer((request, response) => {

  const uri = url.parse(request.url).pathname;

  if (uri.indexOf('/static') === 0) {
    const filename = `${__dirname}/dist/${uri}`;

    
    fs.exists(filename, (exists) => {
      if(!exists) {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
        return;
      }

      fs.readFile(filename, 'binary', (err, file) => {
        if(err) {
          response.writeHead(500, {'Content-Type': 'text/plain'});
          response.write(err);
          response.end();
          return;
        }

        const contentTypesByExtension = {
          '.css':  'text/css',
          '.js':   'text/javascript'
        };

        response.writeHead(200);
        response.write(file, 'binary');
        response.end();
      });
    });
    return;
  }

  const res = require('./dist/server.js').default(uri); // todo - pass in other wanted request properties

  response.writeHead(res.statusCode, res.headers || {});
  response.write(res.body);
  response.end();
}).listen(port);
