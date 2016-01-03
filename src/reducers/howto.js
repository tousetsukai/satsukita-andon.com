const initialState = {
  articles: [],
};

export function howto(state = initialState, action) {
  switch (action.type) {
  case 'articles:set':
    return {
      ...state,
      articles: action.articles,
    };
  default:
    return state;
  }
}
