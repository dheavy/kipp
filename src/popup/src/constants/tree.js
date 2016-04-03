import {Map} from 'immutable';

export const INITIAL_STATE = Map({
  user: Map({
    username: '',
    isLoggedIn: false,
    token: '',
    collections: Map()
  })
});
