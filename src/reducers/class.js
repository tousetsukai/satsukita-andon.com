const initialState = {
  clazz: {}
};

export function clazz(state = initialState, action) {
  switch (action.type) {
  case 'class:set':
    return {
      ...state,
      clazz: action.clazz
    };
  default:
    return state;
  }
}
