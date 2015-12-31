const initialState = {
  user: {},
};

export function app(state = initialState, action) {
  switch (action.type) {
  case 'app:user:set':
    return {
      ...state,
      user: action.user,
    };
  default:
    return state;
  }
}
