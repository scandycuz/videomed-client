import {
  RECEIVE_GLOBAL_ERROR,
  REMOVE_GLOBAL_ERROR,
} from 'actions/types';

export function receiveGlobalError(error) {
  return {
    type: RECEIVE_GLOBAL_ERROR,
    error,
  };
}

export function removeGlobalEror() {
  return {
    type: REMOVE_GLOBAL_ERROR,
  };
}
