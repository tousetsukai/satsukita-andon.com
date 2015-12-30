import { combineReducers } from 'redux';
import { gallery } from './gallery';
import { home } from './home';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  home: home,
  gallery: gallery,
  routing: routeReducer
});
