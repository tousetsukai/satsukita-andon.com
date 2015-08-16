import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import GalleryTop from './containers/gallery/Top';
import GalleryTimes from './containers/gallery/Times';
import Error404 from './containers/errors/Error404';
import OrdInt from './api-mock/OrdInt';

function validTimesStr(nextState, transition) {
  try {
    OrdInt.parse(nextState.params.timesStr);
  } catch (error) {
    transition.to('/notfound');
  }
}

export const routes = (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='gallery' component={GalleryTop} />
    <Route path='gallery/:timesStr' component={GalleryTimes} onEnter={validTimesStr} />
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
