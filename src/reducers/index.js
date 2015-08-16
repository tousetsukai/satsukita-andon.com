import { combineReducers } from 'redux';
import * as gallery from './gallery';

const reducer = combineReducers(Object.assign(
  gallery
));

export default reducer;
