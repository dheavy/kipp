import {createStore, applyMiddleware} from 'redux';
import {INITIAL_STATE} from '../constants/tree';
import reducer from '../reducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(reducer, INITIAL_STATE, applyMiddleware(thunk));
};
