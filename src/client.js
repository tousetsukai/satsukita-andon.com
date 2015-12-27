import { render } from 'react-dom';

import reducer from './reducers';

const initialState = window.__INITIAL_STATE__;

const store = createStore(reducer, initialState);

render(createApp(store), document.getElementById('app'));
