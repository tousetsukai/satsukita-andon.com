import express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import { Router } from 'react-router';
import { createStore } from 'redux';
import Html from './containers/Html';
import makeRoot, { routes } from './universal';
import reducer from './reducers';

const app = express();

app.use('/assets', express.static('assets'));

app.use((req, res) => {
  const location = new Location(req.path, req.query);
  const store = createStore(reducer);
  Router.run(routes, location, (error, initialState /* , transition */) => {
    res.send(
      '<!doctype html>\n' +
      React.renderToString(<Html store={store} component={makeRoot(store, initialState)} />));
  });
});

app.listen(5815);
