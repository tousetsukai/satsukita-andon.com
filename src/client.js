import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';

import { createClientApp, configureStore } from './universal';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
syncReduxAndRouter(browserHistory, store);

const app = createClientApp(store, browserHistory);

render(app, document.getElementById('app'));
