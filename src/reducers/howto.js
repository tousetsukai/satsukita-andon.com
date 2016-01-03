const initialState = {
  articles: [],
  article: {},
};

export function howto(state = initialState, action) {
  switch (action.type) {
  case 'howto:articles:set':
    return {
      ...state,
      articles: action.articles,
    };
  case 'howto:article:set':
    return {
      ...state,
      article: action.article,
    };
  case 'howto:article:clear':
    return {
      ...state,
      article: {},
    };
  default:
    return state;
  }
}
