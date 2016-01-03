const initialState = {
  clazz: {},
  reviews: [],
};

export function clazz(state = initialState, action) {
  switch (action.type) {
  case 'class:set':
    return {
      ...state,
      clazz: action.clazz,
    };
  case 'class:clear':
    return {
      ...state,
      clazz: {},
    };
  case 'class:reviews:set':
    return {
      ...state,
      reviews: action.reviews,
    };
  case 'class:reviews:clear':
    return {
      ...state,
      reviews: [],
    };
  default:
    return state;
  }
}
