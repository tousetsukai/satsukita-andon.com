import { UPDATE_PATH } from 'redux-simple-router';

const initialState = {
  user: {},
  error: {},
  showingError: false,
};

export function app(state = initialState, action) {
  switch (action.type) {
  case 'app:user:set':
    return {
      ...state,
      user: action.user,
    };
  case 'app:error:show':
    return {
      ...state,
      error: action.error,
      showingError: true,
    };
  case 'app:error:hide':
  case UPDATE_PATH:
    return {
      ...state,
      error: {},
      showingError: false,
    };
  default:
    return state;
  }
}
