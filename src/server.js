import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import Helmet from 'react-helmet';

import reducer from './reducers';
import createApp from './isomorphic';

const app = express();
const port = 3000;

const renderFullPage = (head, html, state) => {
  return `
    <!doctype html>
    <html>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        <link rel="shortcut icon" href="/static/favicon.ico">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(state)};
        </script>
        <script src="/static/vendor.bundle.js"></script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

app.use('/static', express.static('static'));
app.use((req, res) => {
  const store = createStore(reducer);
  const html = renderToString(createApp(store));
  const initialState = store.getState();
  const head = Helmet.rewind();
  res.send(renderFullPage(head, html, initialState));
});



const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
