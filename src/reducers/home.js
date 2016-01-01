const initialState = {
  topNews: {},
};

export function home(state = initialState, action) {
  switch (action.type) {
  case 'top-news:set':
    return {
      ...state,
      topNews: action.topNews,
    };
  default:
    return state;
  }
}
