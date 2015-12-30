import { render } from 'react-dom';
import { createHistory } from 'history';

import { createClientApp, configureStore } from './universal';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createHistory();
const app = createClientApp(store, history);

render(app, document.getElementById('app'));
