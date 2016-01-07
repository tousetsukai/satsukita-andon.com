const initialState = {
  clazz: {},
  reviews: [],
  reviewsOf: '',
  reviewCount: 0,
  allReviewCount: 0,
  images: [],
  imagesOf: '',
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
      reviews: state.reviews.concat(action.reviewItems.items),
      reviewsOf: action.reviewsOf,
      reviewCount: state.reviewCount + action.reviewItems.count,
      allReviewCount: action.reviewItems.all_count,
    };
  case 'class:reviews:clear':
    return {
      ...state,
      reviews: [],
      reviewsOf: '',
      reviewCount: 0,
      allReviewCount: 0,
    };
  case 'class:images:append':
    return {
      ...state,
      images: state.images.concat(action.imageItems.items),
      imagesOf: action.imagesOf,
      imageCount: state.imageCount + action.imageItems.count,
      allImageCount: action.imageItems.all_count,
    };
  case 'class:images:clear':
    return {
      ...state,
      images: [],
      imagesOf: '',
      imageCount: 0,
      allImageCount: 0,
    };
  default:
    return state;
  }
}
