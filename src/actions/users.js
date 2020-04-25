import API from 'util/API';
import Error from 'util/Error';
import {
  RECEIVE_USERS,
  RECEIVE_USER,
  RECEIVE_USER_LOADING,
} from 'actions/types';
import { receiveGlobalError } from 'actions/app';
import { format } from 'util/methods';

export function getUsers() {
  return async function(dispatch, getState) {
    try {
      dispatch(receiveUserLoading(true));

      const { token } = getState().session;
      const resp = await API.fetchUsers(token);

      dispatch(receiveUsers(resp.data.map(format)));
    } catch(e) {
      dispatch(receiveGlobalError(Error.normalize(e)));
    } finally {
      dispatch(receiveUserLoading(false));
    }
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user,
  };
}

export function receiveUserLoading(loading) {
  return {
    type: RECEIVE_USER_LOADING,
    loading,
  };
}
