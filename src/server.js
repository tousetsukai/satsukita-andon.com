import express from 'express';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

import { createServerApp, routes, configureStore } from './universal';

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
  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    const store = configureStore();
    const params = renderProps.params;
    const promises = renderProps.components.filter(c => c.fetchData).map(c => c.fetchData({ params, store }));
    Promise.all(promises).then(() => {
      const app = createServerApp(store, renderProps);
      const html = renderToString(app);
      const initialState = store.getState();
      const head = Helmet.rewind();
      res.send(renderFullPage(head, html, initialState));
    });
  });
});

app.listen(port);
