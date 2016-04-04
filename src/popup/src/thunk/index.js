import {Map} from 'immutable';
import {
  LOGIN_REQUEST_BEGIN,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  LOGIN_FB_REQUEST_BEGIN,
  LOGIN_FB_REQUEST_SUCCESS,
  LOGIN_FB_REQUEST_ERROR
} from '../constants/actions';

function loginRequestBegin({username}) {
  return {type: LOGIN_REQUEST_BEGIN, username: username};
}

function loginRequestSuccess({user}) {
  return {type: LOGIN_REQUEST_SUCCESS, user: user};
}

function loginRequestError({username, error}) {
  return {type: LOGIN_REQUEST_ERROR, error: error, username: username};
}

function loginFbRequestBegin({username}) {
  return {type: LOGIN_FB_REQUEST_BEGIN, username: username};
}

function loginFbRequestSuccess({user}) {
  return {type: LOGIN_FB_REQUEST_SUCCESS, user: user};
}

function loginFbRequestError({username, error}) {
  return {type: LOGIN_FB_REQUEST_ERROR, error: error, username: username};
}

export function login({username, password}) {
  return dispatch => {
    dispatch(loginRequestBegin({username}));

    // Proceed with async login attempt.

    dispatch(loginRequestSuccess({
      user: Map({
        username: 'kipp',
        isLoggedIn: true,
        token: 'some.token',
        lastLogin: new Date(),
        lastAction: new Date(),
        collections: Map(
          {id: 0, thumbnail: '//placehold.it/100/80', name: 'my collection 1'},
          {id: 1, thumbnail: '//placehold.it/100/80', name: 'my collection 2'},
          {id: 2, thumbnail: '//placehold.it/100/80', name: 'my collection 3'},
          {id: 3, thumbnail: '//placehold.it/100/80', name: 'my collection 4'},
          {id: 4, thumbnail: '//placehold.it/100/80', name: 'my collection 5'},
          {id: 5, thumbnail: '//placehold.it/100/80', name: 'my collection 6'},
          {id: 6, thumbnail: '//placehold.it/100/80', name: 'my collection 7'},
        )
      })
    }))
  };
};

export function loginFb({username, password}) {
  return dispatch => {
    dispatch(loginFbRequestBegin({username}));
    // Proceed with attempt, then...
    dispatch(loginFbRequestError({
      username: username,
      error: {
        code: 400,
        message: 'Invalid credentials'
      }
    }));
  };
};
