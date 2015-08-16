import { SET_FESTIVALS } from '../constants/ActionTypes';

const initialState = {
  festivals: []
};

export function gallery(state = initialState, action) {
  switch (action.type) {
  case SET_FESTIVALS:
    return {
      ...state,
      festivals: action.festivals
    };
  default:
    return state;
  }
}
