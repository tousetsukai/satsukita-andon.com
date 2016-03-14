const initialState = {
  jumbotronImages: [],
};

export function home(state = initialState, action) {
  switch (action.type) {
  case 'home:jumbotron-images:set':
    return {
      ...state,
      jumbotronImages: action.images.map(i => i.fullsize_url),
    };
  default:
    return state;
  }
}
