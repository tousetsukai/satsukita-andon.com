import React, { Component, PropTypes } from 'react';
import serialize from 'serialize-javascript';
import sleep from 'sleep';

export default class Html extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    component: PropTypes.object.isRequired
  }

  render() {
    sleep.sleep(1);
    const { store, component } = this.props;
    console.log(store.getState());
    return (
      <html>
        <head>
          <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        </head>
        <body>
          {/* renderToString is required for consistency of server-side and client-side*/}
          <div id="root" dangerouslySetInnerHTML={{__html: React.renderToString(component)}} />
          <script src="/assets/js/vendor.bundle.js"></script>
          {/* Below code is for inheriting states from server to client */}
          <script dangerouslySetInnerHTML={{__html: `window.__andon_initial_state=${serialize(store.getState())};`}} />
          <script src="/assets/js/bundle.js"></script>
        </body>
      </html>
    );
  }
}
