import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import * as C from './containers';
import * as D from './containers/dashboard';
import reducer from './reducers';

export const routes = (
  <Route path="/" component={C.App}>
    {/* Home */}
    <IndexRoute component={C.Home}/>
    {/* Gallery */}
    <Route path="gallery" component={C.Gallery}/>
    <Route path="gallery/:times" component={C.Times}/>
    <Route path="gallery/:times/:clazz" component={C.Class}>
      <IndexRoute component={C.ClassImages}/>
      <Route path="basic" component={C.ClassBasic}/>
      <Route path="reviews" component={C.ClassReviews}/>
      <Route path="resources" component={C.ClassResources}/>
      <Route path="articles/:id" component={C.ClassArticle}/>
      <Route path="resources/:id" component={C.ClassResource}/>
      <Route path="images" component={C.ClassImages}/>
      <Route path="*" component={C.NotFound}/>
    </Route>
    {/* Howto */}
    <Route path="howto" component={C.Howto}/>
    <Route path="howto/articles/:id" component={C.Article}/>
    {/* User page */}
    <Route path="users/:login" component={C.User}/>
    {/* Static pages */}
    <Route path="about" component={C.About}/>
    <Route path="contact" component={C.Contact}/>
    <Route path="license" component={C.License}/>
    {/* Dashboard */}
    <Route path="signin" component={C.Signin}/>
    <Route path="dashboard/home" component={D.Home}/>
    {/* Not Found */}
    <Route path="*" component={C.NotFound}/>
  </Route>
);

const logger = createLogger({
  logger: console,
});
export const configureStore = (initialState, ...middlewares) => {
  return applyMiddleware(
    thunk,
    logger,
    ...middlewares
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
