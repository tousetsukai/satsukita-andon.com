const initialState = {
  user: {},
};

export function users(state = initialState, action) {
  switch (action.type) {
  case 'users:user:set':
    return {
      ...state,
      user: action.user,
    };
  case 'users:user:clear':
    return {
      ...state,
      user: {},
    };
  default:
    return state;
  }
}
