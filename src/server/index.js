import express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Helmet from 'react-helmet';
import html from './html.js';
import makeRoot, { routes } from '../universal';
import reducer from '../reducers';

const app = express();

app.use('/assets', express.static('assets'));

app.use((req, res) => {
  const location = new Location(req.path, req.query);
  console.log(`location: ${req.path}`); // eslint-disable-line no-console
  const finalCreateStore = applyMiddleware(thunk)(createStore);
  const store = finalCreateStore(reducer);
  Router.run(routes, location, (error, initialState, transition) => {
    if (error) {
      res.send(error.toString());
    } else if (transition.isCancelled && transition.redirectInfo) {
      res.redirect(transition.redirectInfo.pathname);
    } else {
      const rootString = React.renderToString(makeRoot(store, initialState));
      const { title, meta, link } = Helmet.rewind();
      const serializedState = JSON.stringify(store.getState());
      res.send(html(title, meta, link, rootString, serializedState));
    }
  });
});

app.listen(5815);
