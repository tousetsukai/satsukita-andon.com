const initialState = {
  about: '',
};

export function contents(state = initialState, action) {
  switch (action.type) {
  case 'contents:about:set':
    return {
      ...state,
      about: action.content,
    };
  default:
    return state;
  }
}
