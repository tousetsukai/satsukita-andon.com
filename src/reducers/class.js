const initialState = {
  clazz: {},
  reviews: [],
  images: [],
  imageCount: 0,
  allImageCount: 0,
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
  case 'class:images:append':
    return {
      ...state,
      images: state.images.concat(action.imageItems.items),
      imageCount: state.imageCount + action.imageItems.count,
      allImageCount: action.imageItems.all_count,
    };
  case 'class:images:clear':
    return {
      ...state,
      images: [],
      imageCount: 0,
      allImageCount: 0,
    };
  default:
    return state;
  }
}
