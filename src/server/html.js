import React from 'react';
import serialize from 'serialize-javascript';

export default function html(store, component) {
  return `
      <!doctype html>
      <html>
        <head>
          <link rel="shortcut icon" href="/assets/img/favicon.ico">
        </head>
        <body>
          <div id="root">${React.renderToString(component)}</div>
          <script src="/assets/js/vendor.bundle.js"></script>
          <script>window.__andon_initial_state=${serialize(store.getState())};</script>
          <script src="/assets/js/bundle.js"></script>
        </body>
      </html>
  `;
}
