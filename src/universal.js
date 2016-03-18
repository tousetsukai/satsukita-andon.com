import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

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
    <Route path="howto/resources/:id" component={C.Resource}/>
    {/* User page */}
    <Route path="users/:login" component={C.User}/>
    {/* Static pages */}
    <Route path="about" component={C.About}/>
    <Route path="contact" component={C.Contact}/>
    <Route path="license" component={C.License}/>
    {/* Dashboard */}
    <Route path="signin" component={C.Signin}/>
    <Route path="dashboard" component={D.Container} onEnter={undefined}>
      <IndexRoute component={D.Home}/>
      <Route path="articles" component={D.Articles}/>
      <Route path="articles/create" component={D.ArticlesCreate}/>
      <Route path="articles/:id/edit" component={D.ArticlesCreate}/>
      <Route path="resources" component={D.Resources}/>
      <Route path="resources/create" component={D.ResourcesCreate}/>
      <Route path="resources/:id/edit" component={D.ResourcesCreate}/>
      <Route path="classes" component={D.Classes}/>
      <Route path="classes/:times" component={D.Classes}/>
      <Route path="classes/:classId/images" component={D.ClassesImages}/>
      <Route path="classes/:classId/review" component={D.ClassesReview}/>
      <Route path="classes/:classId/articles" component={D.ClassesArticles}/>
      <Route path="classes/:classId/articles/create" component={D.ClassesArticlesEdit}/>
      <Route path="classes/:classId/articles/:id/edit" component={D.ClassesArticlesEdit}/>
      <Route path="classes/:classId/resources" component={D.ClassesResources}/>
      <Route path="classes/:classId/resources/create" component={D.ClassesResourcesEdit}/>
      <Route path="classes/:classId/resources/:id/edit" component={D.ClassesResourcesEdit}/>
      <Route path="settings" component={D.Settings}/>
      <Route path="*" component={C.NotFound}/>
    </Route>
    {/* Not Found */}
    <Route path="*" component={C.NotFound}/>
  </Route>
);

export const configureStore = (initialState, ...middlewares) => {
  return applyMiddleware(
    thunk,
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
