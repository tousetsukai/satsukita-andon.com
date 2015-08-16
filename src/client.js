import React from 'react';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore } from 'redux';
import reducer from './reducers';
import makeRoot from './universal';

const store = createStore(reducer, window.__andon_initial_state);

React.render(makeRoot(store, {history}), document.getElementById('root'));
