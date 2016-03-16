const initialState = {
  articles: [],
  articleCount: 0,
  allArticleCount: 0,
  article: {},
};

export function howto(state = initialState, action) {
  switch (action.type) {
  case 'howto:articles:append':
    return {
      ...state,
      articles: state.articles.concat(action.items.items),
      articleCount: state.articleCount + action.items.count,
      allArticleCount: action.items.all_count,
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
