const initialState = {
  news: {},
  about: {},
};

export function contents(state = initialState, action) {
  switch (action.type) {
  case 'contents:news:set':
    return {
      ...state,
      news: action.content,
    };
  case 'contents:about:set':
    return {
      ...state,
      about: action.content,
    };
  default:
    return state;
  }
}
