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
  default:
    return state;
  }
}
