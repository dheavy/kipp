import {Map} from 'immutable';
import {
  LOGIN_REQUEST_BEGIN,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  LOGIN_FB_REQUEST_BEGIN,
  LOGIN_FB_REQUEST_SUCCESS,
  LOGIN_FB_REQUEST_ERROR
} from '../constants/actions';

export default function reducer(state, action) {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
      return state.merge(Map({
        user: action.user
      }));

    default:
      return state;
  }
};
