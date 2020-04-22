import API from 'util/API';
import { RECEIVE_AUTH_TOKEN, RECEIVE_SESSION_LOADING } from 'actions/types';

export function login(email, password) {
  return async function(dispatch) {
    try {
      dispatch(receiveSessionLoading(true));

      const resp = await API.createSession(email, password);

      dispatch(receiveAuthToken(resp.data.auth_token));
      dispatch(receiveSessionLoading(false));
    } catch(e) {
      receiveSessionLoading(false);
      console.log(e);
    }
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
