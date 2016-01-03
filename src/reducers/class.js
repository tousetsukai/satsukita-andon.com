const initialState = {
  clazz: {},
  reviews: [],
  images: [],
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
  case 'class:images:set':
    return {
      ...state,
      images: action.images,
    };
  case 'class:images:clear':
    return {
      ...state,
      images: [],
    };
  default:
    return state;
  }
}
