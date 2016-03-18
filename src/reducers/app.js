const initialState = {
  user: {},
  error: {},
  showingError: false,
  loading: false,
};

let loadingCount = 0;

export function app(state = initialState, action) {
  switch (action.type) {
  case 'app:user:set':
    return {
      ...state,
      user: action.user,
    };
  case 'app:icon:set':
    return {
      ...state,
      user: {
        ...state.user,
        icon_url: action.url,
      },
    };
  case 'app:loading:show':
    loadingCount++;
    return {
      ...state,
      loading: true,
    };
  case 'app:loading:hide':
    loadingCount = (loadingCount == 0) ? 0 : loadingCount - 1;
    return {
      ...state,
      loading: loadingCount > 0,
    };
  case 'app:error:show':
    return {
      ...state,
      error: action.error,
      showingError: true,
    };
  case 'app:error:hide':
    return {
      ...state,
      error: {},
      showingError: false,
    };
  default:
    return state;
  }
}
