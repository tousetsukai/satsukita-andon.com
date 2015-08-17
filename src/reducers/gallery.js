import { SET_FESTIVALS, SET_CLASSES, SET_CLASS_DATA } from '../constants/ActionTypes';

const initialState = {
  festivals: [],
  classes: [],
  classData: {}
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
  case SET_CLASS_DATA:
    return {
      ...state,
      classData: action.classData
    };
  default:
    return state;
  }
}
