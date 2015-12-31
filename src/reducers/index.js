import { combineReducers } from 'redux';
import { app } from './app';
import { home } from './home';
import { gallery } from './gallery';
import { times } from './times';
import { clazz } from './class';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  app,
  home,
  gallery,
  times,
  clazz,
  routing: routeReducer,
});
