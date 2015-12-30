import { combineReducers } from 'redux';
import { gallery } from './gallery';
import { routeReducer } from 'redux-simple-router';

export default combineReducers({
  gallery: gallery,
  routing: routeReducer
});
