import React from 'react';
import { Router, Route, RoutingContext } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './containers';
import Gallery from './containers/gallery';
import About from './containers/about';
import reducer from './reducers';

export const routes = (
  <Route path="/" component={App}>
    <Route path="gallery" component={Gallery}/>
    <Route path="about" component={About}/>
  </Route>
);

export const configureStore = (initialState) => {
  return applyMiddleware(
    thunk
  )(createStore)(reducer, initialState);
};

const withReduxProvider = (store, children) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export const createClientApp = (store, history) => {
  return withReduxProvider(store, <Router history={history}>{routes}</Router>);
};

export const createServerApp = (store, context) => {
  return withReduxProvider(store, <RoutingContext {...context}/>);
};
