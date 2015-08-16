import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import GalleryTop from './containers/gallery/Top';
import Error404 from './containers/errors/Error404';

// this must be function.
// otherwise, "Could not find store in either the context or props ..."
export const routes = (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='gallery' component={GalleryTop} />
    <Route path='*' component={Error404} />
  </Route>
);

export default function makeRoot(store, options = {}) {
  return (
    <Provider store={store}>
      {() => <Router {...options}>{routes}</Router>}
    </Provider>
  );
}
