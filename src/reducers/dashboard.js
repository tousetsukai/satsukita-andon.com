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

export function dashboard(state = initialState, action) {
  switch (action.type) {
  case 'dashboard:articles:append':
    return {
      ...state,
      articles: state.articles.concat(action.items.items),
      articleCount: state.articleCount + action.items.count,
      allArticleCount: action.items.all_count,
    };
  case 'dashboard:article:set':
    return {
      ...state,
      article: action.article,
    };
  case 'dashboard:article:clear':
    return {
      ...state,
      article: {},
    };

  case 'dashboard:resources:append':
    return {
      ...state,
      resources: state.resources.concat(action.items.items),
      resourceCount: state.resourceCount + action.items.count,
      allResourceCount: action.items.all_count,
    };
  case 'dashboard:resource:set':
    return {
      ...state,
      resource: action.resource,
    };
  case 'dashboard:resource:clear':
    return {
      ...state,
      resource: {},
    };
  default:
    return state;
  }
}
