const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
//const dev = process.env.NODE_ENV !== 'production';
const dev = process.env.NODE_ENV === 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const photos = require("./data/photos");
const comments = require("./data/comments");

app.prepare()
  .then(() => {
    const server = express()

    server.get('/photo', (req, res) => {
      return app.render(req, res, '/photo', req.query)
    })

    server.route("/photos").get((req, res) => {
      res.json(photos);
    });

    server.route("/api/comments/:photoCode").get((req, res) => {
      const comment = comments[req.params.photoCode] || [];
      res.json(comment);
    });

    app.use("/api", router);
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })