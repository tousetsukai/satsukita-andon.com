import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';

import reducer from './reducers';
import createApp from './isomorphic';

const app = express();
const port = 3000;

const renderFullPage = (html, state) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
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

app.use((req, res) => {
  const store = createStore(reducer);
  const html = renderToString(createApp(store));
  const initialState = store.getState();
  res.send(renderFullPage(html, initialState));
});



const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
