import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import GalleryTop from './containers/gallery/Top';
import GalleryTimes from './containers/gallery/Times';
import GalleryClass from './containers/gallery/Class';
import Error404 from './containers/errors/Error404';
import OrdInt from './api-mock/OrdInt';

function composeValidators(...validators) {
  return (nextState, location) => {
    validators.forEach((validate) => validate(nextState, location));
  };
}

function ordIntType(paramname) {
  return (nextState, transition) => {
    if (!OrdInt.regexp.test(nextState.params[paramname])) {
      transition.to('/notfound');
    }
  };
}

function naturalType(paramname) {
  return (nextState, transition) => {
    const r = /^([0-9]|[1-9][0-9]+)$/;
    if (!r.test(nextState.params[paramname])) {
      transition.to('/notfound');
    }
  };
}

function intType(paramname) {
  return (nextState, transition) => {
    const r = /^-?([0-9]|[1-9][0-9]+)$/;
    if (!r.test(nextState.params[paramname])) {
      transition.to('/notfound');
    }
  };
}

export const routes = (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='gallery' component={GalleryTop} />
    <Route path='gallery/:timesStr' component={GalleryTimes} onEnter={ordIntType('timesStr')} />
    <Route path='gallery/:timesStr/:grade/:clazz' component={GalleryClass} onEnter={composeValidators(ordIntType('timesStr'), naturalType('grade'), intType('clazz'))} />
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
