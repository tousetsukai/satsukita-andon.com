const initialState = {
  classes: [],
};

export function times(state = initialState, action) {
  switch (action.type) {
  case 'times:set':
    return {
      ...state,
      classes: action.classes,
    };
  case 'times:clear':
    return {
      ...state,
      classes: [],
    };
  default:
    return state;
  }
}
