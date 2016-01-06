import { UPDATE_PATH } from 'redux-simple-router';

import ga from '../util/ga';

const initialState = {
  user: {},
  error: {},
  showingError: false,
  loading: false,
};

export function app(state = initialState, action) {
  switch (action.type) {
  case 'app:user:set':
    return {
      ...state,
      user: action.user,
    };
  case 'app:loading:show':
    return {
      ...state,
      loading: true,
    };
  case 'app:loading:hide':
    return {
      ...state,
      loading: false,
    };
  case 'app:error:show':
    return {
      ...state,
      error: action.error,
      showingError: true,
    };
  case 'app:error:hide':
    return {
      ...state,
      error: {},
      showingError: false,
    };
  case UPDATE_PATH:
    ga(action.payload.path);
    return {
      ...state,
      error: {},
      showingError: false,
      loading: false,
    };
  default:
    return state;
  }
}
