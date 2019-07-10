const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const regexparam = require('regexparam');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {

    const { pathname, query } = parse(req.url, true);

    // dynamic routes
    const playShipRoute = regexparam('^/play/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$');
    if (playShipRoute.pattern.test(pathname)) {
      const [shipId] = playShipRoute.pattern.exec(pathname);
      app.render(req, res, '/play/ship', {...query, shipId});
      return;
    }

    // all other routes
    handle(req, res);

  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`)
  })
});
