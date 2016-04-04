import {Map, List} from 'immutable';

export const INITIAL_STATE = Map({
  user: Map({
    username: '',
    isLoggedIn: false,
    token: '',
    lastLogin: null,
    lastAction: null,
    collections: List()
  })
});
