import { combineReducers } from 'redux';
import { app } from './app';
import { home } from './home';
import { contents } from './contents';
import { gallery } from './gallery';
import { times } from './times';
import { clazz } from './class';
import { howto } from './howto';
import { users } from './users';
import { dashboard } from './dashboard';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  home,
  contents,
  gallery,
  times,
  clazz,
  howto,
  users,
  dashboard,
  routing: routerReducer,
});
