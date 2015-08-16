import { SET_FESTIVALS, SET_CLASSES } from '../constants/ActionTypes';

const initialState = {
  festivals: [],
  classes: []
};

export function gallery(state = initialState, action) {
  switch (action.type) {
  case SET_FESTIVALS:
    return {
      ...state,
      festivals: action.festivals
    };
  case SET_CLASSES:
    return {
      ...state,
      classes: action.classes
    };
  default:
    return state;
  }
}
