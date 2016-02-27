const initialState = {
  news: {},
  about: {},
  contact: {},
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
  case 'contents:contact:set':
    return {
      ...state,
      contact: action.content,
    };
  default:
    return state;
  }
}
