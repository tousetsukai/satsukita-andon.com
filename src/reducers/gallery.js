const initialState = {
  festivals: [],
};

export function gallery(state = initialState, action) {
  switch (action.type) {
  case 'festivals:set':
    return {
      ...state,
      festivals: action.festivals,
    };
  default:
    return state;
  }
}
