import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import PopupContainer from './container/PopupContainer';

require('!style!css!sass!../../../node_modules/bootstrap/scss/bootstrap.scss');
require('!style!css!sass!./styles/popup.scss');

render(
  <Provider store={store()}>
    <PopupContainer />
  </Provider>,
  document.getElementById('mount')
)
