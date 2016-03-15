import { render } from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import { syncHistoryWithStore } from 'react-router-redux';

import { createClientApp, configureStore } from './universal';
import ga from './util/ga';

const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = useRouterHistory(useScroll(createHistory))({ queryKey: false });
const synced = syncHistoryWithStore(history, store);

// Google Analytics
synced.listen(l => ga(l.pathname));

const app = createClientApp(store, synced);

render(app, document.getElementById('app'));
