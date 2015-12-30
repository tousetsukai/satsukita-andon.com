import { render } from 'react-dom';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';

import { createClientApp, configureStore } from './universal';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createHistory();
syncReduxAndRouter(history, store);

const app = createClientApp(store, history);

render(app, document.getElementById('app'));
