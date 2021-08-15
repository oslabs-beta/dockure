import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from './redux/reducers';

const store = createStore(reducers, composeWithDevTools());

export default store;
