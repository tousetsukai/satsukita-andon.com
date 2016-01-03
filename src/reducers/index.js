import { combineReducers } from 'redux';
import { app } from './app';
import { home } from './home';
import { contents } from './contents';
import { gallery } from './gallery';
import { times } from './times';
import { clazz } from './class';
import { howto } from './howto';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  app,
  home,
  contents,
  gallery,
  times,
  clazz,
  howto,
  routing: routeReducer,
});
