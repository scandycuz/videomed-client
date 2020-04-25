import API from 'util/API';
import Cable from 'util/Cable';
import { protocol, base } from 'util/env';
import { format, unformat } from 'util/methods';
import { receiveMessage, closeStream } from 'actions/stream';
import { getUsers } from 'actions/users';
import Error from 'util/Error';
import {
  RECEIVE_AUTH_TOKEN,
  RECEIVE_LOGOUT,
  RECEIVE_SESSION_LOADING,
  RECEIVE_SESSION_ERROR,
  RECEIVE_CURRENT_USER,
} from 'actions/types';

export function login(params) {
  return async function(dispatch) {
    try {
      dispatch(receiveSessionLoading(true));

      const token = await dispatch(authenticate(params));
      window.sessionStorage.setItem('token', token);

      await dispatch(onLogin());
    } catch(e) {
      dispatch(receiveSessionError(Error.normalize(e)));
    } finally {
      dispatch(receiveSessionLoading(false));
    }
  }
}

export function loginFromSession() {
  return async function(dispatch) {
    try {
      dispatch(receiveSessionLoading(true));

      const token = sessionStorage.getItem('token');

      if (!token) return;

      await dispatch(receiveAuthToken(token));

      await dispatch(onLogin());
    } catch(e) {
      dispatch(receiveSessionError(Error.normalize(e)));
    } finally {
      dispatch(receiveSessionLoading(false));
    }
  }
}

export function onLogin() {
  return async function(dispatch) {
    await dispatch(getCurrentUser());

    await dispatch(getUsers());

    await dispatch(connectWebsocket());

    await dispatch(subscribeToSessions());
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(receiveSessionLoading(true));

    window.sessionStorage.removeItem('token');

    dispatch(closeStream());
    dispatch(receiveLogout());

    dispatch(receiveSessionLoading(false));
  }
}

export function authenticate(params) {
  return async function(dispatch) {
    const resp = await API.createSession(params);
    const token = resp.data.auth_token;
    dispatch(receiveAuthToken(token));

    return token;
  }
}

export function getCurrentUser() {
  return async function(dispatch, getState) {
    try {
      const { token } = getState().session;

      const resp = await API.fetchCurrentUser(token);
      const currentUser = format(resp.data);
      dispatch(receiveCurrentUser(currentUser));

      return currentUser;
    } catch(e) {
      dispatch(receiveSessionError(Error.normalize(e)));
    }
  }
}

export function connectWebsocket() {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    await Cable.initialize(`${protocol.replace('http', 'ws')}${base}/cable`, token);
  }
}

export function subscribeToSessions() {
  return async function(dispatch, getState) {
    const { currentUser } = getState().session;

    await Cable.subscribe({
      channel: 'SessionChannel',
      id: currentUser.id,
    }, (event) => {
      const data = JSON.parse(event.data);

      if (data.message && data.message.type) {
        dispatch(receiveMessage(data.message));
      }
    });
  }
}

export function createAccount(params) {
  return async function(dispatch) {
    try {
      dispatch(receiveSessionLoading(true));

      await API.createAccount(unformat(params));

      dispatch(receiveSessionLoading(false));
    } catch(e) {
      dispatch(receiveSessionError(Error.normalize(e)));
      dispatch(receiveSessionLoading(false));
    }
  }
}

export function receiveCurrentUser(currentUser) {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  }
}

export function receiveAuthToken(token) {
  return {
    type: RECEIVE_AUTH_TOKEN,
    token,
  };
}

export function receiveLogout() {
  return {
    type: RECEIVE_LOGOUT,
  };
}

export function receiveSessionLoading(loading) {
  return {
    type: RECEIVE_SESSION_LOADING,
    loading,
  };
}

export function receiveSessionError(error) {
  if (error === 'Invalid Request') {
    error = 'Invalid email or password';
  }

  return {
    type: RECEIVE_SESSION_ERROR,
    error,
  };
}
