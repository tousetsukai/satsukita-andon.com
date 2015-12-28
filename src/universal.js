import React from 'react';
import { Provider } from 'react-redux';

import App from './containers';

export default function(store) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
