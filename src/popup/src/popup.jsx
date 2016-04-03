import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store';
import PopupContainer from './container/PopupContainer';

require('!style!css!sass!../../../node_modules/normalize.scss/normalize.scss');
require('!style!css!sass!./styles/popup.scss');

const store = configureStore();

render(
  <Provider store={store}>
    <PopupContainer />
  </Provider>,
  document.getElementById('mount')
)
