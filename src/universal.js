import React from 'react';
import { Router, Route, RoutingContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as C from './containers';
import reducer from './reducers';

export const routes = (
  <Route path="/" component={C.App}>
    <IndexRoute component={C.Home}/>
    <Route path="gallery" component={C.Gallery}/>
    <Route path="gallery/:times" component={C.Times}/>
    <Route path="gallery/:times/:clazz" component={C.Class}/>
    <Route path="about" component={C.About}/>
    <Route path="*" component={C.NotFound}/>
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
