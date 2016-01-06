import express from 'express';
import cookieParser from 'cookie-parser';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import { createServerApp, routes, configureStore } from './universal';

const app = express();
app.use(cookieParser());
const port = 5927;

const renderFullPage = (head, html, state) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        ${head.title.toString()}
        ${head.meta.toString()}
        <link rel="shortcut icon" href="/static/favicon.ico">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@andon_bot">
        <link rel="stylesheet" href="/static/lib/normalize.css/normalize.css" type="text/css">
        <link rel="stylesheet" href="/static/lib/font-awesome/css/font-awesome.min.css" type="text/css">
        <link rel="stylesheet" href="/static/lib/elemental/elemental.css" type="text/css">
        <link rel="stylesheet" href="/static/lib/react-progress-bar-plus/dist/progress-bar.css" type="text/css">
        <link rel="stylesheet" href="/static/bundle.css" type="text/css">
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-42498105-1', 'auto');
          ga('send', 'pageview');

        </script>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${serialize(state)};
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
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (!renderProps) {
      res.status(404).send('Not found');
    } else {
      const store = configureStore();
      const params = renderProps.params;
      const token = req.cookies.token;
      const fetchParams = { token, params, dispatch: store.dispatch };
      const promises = renderProps.components
        .map(c => {
          if (c.fetchData) { // no higher-order component, and react-redux
            return c.fetchData(fetchParams);
          } else if (c.wrapped && c.wrapped.fetchData) { // react-jss
            return c.wrapped.fetchData(fetchParams);
          } else {
            return Promise.resolve(0);
          }
        });
      Promise.all(promises).then(() => {
        const app = createServerApp(store, renderProps);
        const html = renderToString(app);
        const initialState = store.getState();
        const head = Helmet.rewind();
        res.send(renderFullPage(head, html, initialState));
      });
    }
  });
});

app.listen(port);
