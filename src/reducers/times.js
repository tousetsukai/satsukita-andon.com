const initialState = {
  classes: [],
  classesOf: '',
};

export function times(state = initialState, action) {
  switch (action.type) {
  case 'times:set':
    return {
      ...state,
      classes: action.classes,
      classesOf: action.classesOf,
    };
  case 'times:clear':
    return {
      ...state,
      classes: [],
      classesOf: '',
    };
  default:
    return state;
  }
}
