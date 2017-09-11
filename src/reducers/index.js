import { combineReducers } from 'redux';
import MainReducer from './main-reducer.js';

const rootReducer = combineReducers({
  main: MainReducer
});

export default rootReducer;