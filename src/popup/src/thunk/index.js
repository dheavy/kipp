import {Map, List} from 'immutable';
import {
  LOGIN_REQUEST_BEGIN,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_ERROR,
  LOGIN_FB_REQUEST_BEGIN,
  LOGIN_FB_REQUEST_SUCCESS,
  LOGIN_FB_REQUEST_ERROR,
  CHROME_MESSAGING
} from '../../../common/scripts/constants/actions';

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

/**
 * Thunk action used for syncing state with other page
 * (i.e. background) of the extension.
 *
 * @param  {string} options.sender       Name of the sending page.
 * @param  {string} options.recipient    Name of the receiving page.
 * @param  {string} options.remoteAction Optional action to trigger in receiver.
 * @param  {any}    options.payload      Optional payload to pass to receiver.
 * @return {Object} Action object.
 */
function chromeMessaging({sender, recipient, remoteAction, payload}) {
  return {
    type: CHROME_MESSAGING,
    sender: sender,
    recipient: recipient,
    remoteAction: remoteAction,
    payload: payload
  };
}

export function login({username, password}) {
  return dispatch => {
    dispatch(loginRequestBegin({username}));

    // TODO: proceed with async login attempt.

    dispatch(loginRequestSuccess({
      user: Map({
        username: 'kipp',
        isLoggedIn: true,
        token: 'some.token',
        lastLogin: new Date(),
        lastAction: new Date(),
        collections: List.of(
          Map({id: 0, thumbnail: '//placehold.it/100x80', name: 'my collection 1'}),
          Map({id: 1, thumbnail: '//placehold.it/100x80', name: 'my collection 2'}),
          Map({id: 2, thumbnail: '//placehold.it/100x80', name: 'my collection 3'}),
          Map({id: 3, thumbnail: '//placehold.it/100x80', name: 'my collection 4'}),
          Map({id: 4, thumbnail: '//placehold.it/100x80', name: 'my collection 5'}),
          Map({id: 5, thumbnail: '//placehold.it/100x80', name: 'my collection 6'}),
          Map({id: 6, thumbnail: '//placehold.it/100x80', name: 'my collection 7'}),
          Map({id: 7, thumbnail: '//placehold.it/100x80', name: 'my collection 8'}),
          Map({id: 8, thumbnail: '//placehold.it/100x80', name: 'my collection 9'}),
          Map({id: 9, thumbnail: '//placehold.it/100x80', name: 'my collection 10'}),
          Map({id: 10, thumbnail: '//placehold.it/100x80', name: 'my collection 11'}),
          Map({id: 11, thumbnail: '//placehold.it/100x80', name: 'my collection 12'})
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
