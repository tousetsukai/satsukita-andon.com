import { combineReducers } from 'redux';
import { home } from './home';
import { gallery } from './gallery';
import { times } from './times';
import { clazz } from './class';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  home,
  gallery,
  times,
  clazz,
  routing: routeReducer
});
