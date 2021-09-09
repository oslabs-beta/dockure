import { combineReducers } from 'redux';
import { containerReducer } from './containerReducer';

export const reducers = combineReducers({
  containers: containerReducer,
});
