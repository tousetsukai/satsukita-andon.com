const initialState = {
  festivals: []
};

export function gallery(state = initialState, action) {
  switch (action.type) {
  case 'set_festivals':
    return {
      ...state,
      festivals: action.festivals
    };
  default:
    return state;
  }
}
