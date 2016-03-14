const initialState = {
  clazz: {},
  reviews: [],
  reviewsOf: '',
  reviewCount: 0,
  allReviewCount: 0,
  articles: [],
  articlesOf: '',
  articleCount: 0,
  allArticleCount: 0,
  resources: [],
  resourcesOf: '',
  resourceCount: 0,
  resource: {},
  allResourceCount: 0,
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
      reviews: state.reviews.concat(action.items.items),
      reviewsOf: action.of,
      reviewCount: state.reviewCount + action.items.count,
      allReviewCount: action.items.all_count,
    };
  case 'class:reviews:clear':
    return {
      ...state,
      reviews: [],
      reviewsOf: '',
      reviewCount: 0,
      allReviewCount: 0,
    };
  case 'class:articles:set':
    return {
      ...state,
      articles: state.articles.concat(action.items.items),
      articlesOf: action.of,
      articleCount: state.articleCount + action.items.count,
      allArticleCount: action.items.all_count,
    };
  case 'class:articles:clear':
    return {
      ...state,
      articles: [],
      articlesOf: '',
      articleCount: 0,
      allArticleCount: 0,
    };
  case 'class:resources:set':
    return {
      ...state,
      resources: state.resources.concat(action.items.items),
      resourcesOf: action.of,
      resourceCount: state.resourceCount + action.items.count,
      allResourceCount: action.items.all_count,
    };
  case 'class:resources:clear':
    return {
      ...state,
      resources: [],
      resourcesOf: '',
      resourceCount: 0,
      allResourceCount: 0,
    };
  case 'class:resource:set':
    return {
      ...state,
      resource: action.resource,
    };
  case 'class:resource:clear':
    return {
      ...state,
      resource: {},
    };
  case 'class:images:append':
    return {
      ...state,
      images: state.images.concat(action.items.items),
      imagesOf: action.of,
      imageCount: state.imageCount + action.items.count,
      allImageCount: action.items.all_count,
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
