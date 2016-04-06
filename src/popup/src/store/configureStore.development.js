import {createStore, applyMiddleware, compose} from 'redux';
import storage from '../../../common/scripts/storage';
import {INITIAL_STATE} from '../constants/tree';
import reducer from '../reducer';
import thunk from 'redux-thunk';

const enhancer = compose(
  applyMiddleware(thunk),
  storage(),
  window.devToolsExtension ? window.devToolsExtension() : noop => noop
);

export default function (initialState = INITIAL_STATE) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer');
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}
