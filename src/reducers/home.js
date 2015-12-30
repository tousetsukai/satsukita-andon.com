const initialState = {
  topNews: {}
};

export function home(state = initialState, action) {
  switch (action.type) {
  case 'set_top_news':
    return {
      ...state,
      topNews: action.topNews
    };
  default:
    return state;
  }
}
