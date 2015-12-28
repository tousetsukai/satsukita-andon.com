import { render } from 'react-dom';
import { createStore } from 'redux';

import reducer from './reducers';
import createApp from './universal';

const initialState = window.__INITIAL_STATE__;

const store = createStore(reducer, initialState);

render(createApp(store), document.getElementById('app'));
