import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import * as C from './containers';
import reducer from './reducers';

export const routes = (
  <Route path="/" component={C.App}>
    <IndexRoute component={C.Home}/>
    <Route path="gallery" component={C.Gallery}/>
    <Route path="gallery/:times" component={C.Times}/>
    <Route path="gallery/:times/:clazz" component={C.Class}>
      <IndexRoute component={C.ClassBasic}/>
      <Route path="basic" component={C.ClassBasic}/>
      <Route path="reviews" component={C.ClassReviews}/>
      <Route path="images" component={C.ClassImages}/>
      <Route path="*" component={C.NotFound}/>
    </Route>
    <Route path="howto" component={C.Howto}/>
    <Route path="howto/articles/:id" component={C.Article}/>
    <Route path="about" component={C.About}/>
    <Route path="signin" component={C.Signin}/>
    <Route path="*" component={C.NotFound}/>
  </Route>
);

const logger = createLogger({
  logger: console,
});
export const configureStore = (initialState) => {
  return applyMiddleware(
    thunk,
    logger
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

export const createServerApp = (store, props) => {
  return withReduxProvider(store, <RouterContext {...props}/>);
};
