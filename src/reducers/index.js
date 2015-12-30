import { combineReducers } from 'redux';
import { home } from './home';
import { gallery } from './gallery';
import { times } from './times';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  home,
  gallery,
  times,
  routing: routeReducer
});
