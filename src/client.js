import React from 'react';
import { history } from 'react-router/lib/BrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import makeRoot from './universal';

const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer, window.__andon_initial_state);

React.render(makeRoot(store, {history}), document.getElementById('root'));
