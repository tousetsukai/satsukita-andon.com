const initialState = {
  articles: [],
  articleCount: 0,
  allArticleCount: 0,
  article: {},

  resources: [],
  resourceCount: 0,
  allResourceCount: 0,
  resource: {},
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

  case 'howto:resources:append':
    return {
      ...state,
      resources: state.resources.concat(action.items.items),
      resourceCount: state.resourceCount + action.items.count,
      allResourceCount: action.items.all_count,
    };
  case 'howto:resource:set':
    return {
      ...state,
      resource: action.resource,
    };
  case 'howto:resource:clear':
    return {
      ...state,
      resource: {},
    };
  default:
    return state;
  }
}
