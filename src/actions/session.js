import API from 'util/API';
import Cable from 'util/Cable';
import { protocol, base } from 'util/env';
import { format } from 'util/methods';
import { receiveMessage } from 'actions/stream';
import {
  RECEIVE_AUTH_TOKEN,
  RECEIVE_SESSION_LOADING,
  RECEIVE_CURRENT_USER,
} from 'actions/types';

export function login(email, password) {
  return async function(dispatch) {
    try {
      let resp;

      dispatch(receiveSessionLoading(true));

      // authenticate
      resp = await API.createSession(email, password);
      const token = resp.data.auth_token;
      dispatch(receiveAuthToken(token));

      // get current user
      resp = await API.fetchCurrentUser(token);
      const currentUser = format(resp.data);
      dispatch(receiveCurrentUser(currentUser));

      // connect websocket
      Cable.initialize(`${protocol.replace('http', 'ws')}${base}/cable`, token);
      await Cable.subscribe({
        channel: 'SessionChannel',
        id: currentUser.id,
      }, (event) => {
        const data = JSON.parse(event.data);

        if (data.message && data.message.type) {
          dispatch(receiveMessage(data.message));
        }
      });

      dispatch(receiveSessionLoading(false));
    } catch(e) {
      receiveSessionLoading(false);
      console.log(e);
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

export function receiveSessionLoading(loading) {
  return {
    type: RECEIVE_SESSION_LOADING,
    loading,
  };
}
