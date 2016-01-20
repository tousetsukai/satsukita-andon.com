import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';

import { createClientApp, configureStore } from './universal';

const initialState = window.__INITIAL_STATE__;

const reduxRouterMiddleware = syncHistory(browserHistory);
const store = configureStore(initialState, reduxRouterMiddleware);

const app = createClientApp(store, browserHistory);

render(app, document.getElementById('app'));
