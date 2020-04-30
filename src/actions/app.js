import {
  RECEIVE_GLOBAL_MESSAGE,
  REMOVE_GLOBAL_MESSAGE,
  RECEIVE_GLOBAL_ERROR,
  REMOVE_GLOBAL_ERROR,
} from 'actions/types';

export function receiveGlobalMessage(message) {
  return {
    type: RECEIVE_GLOBAL_MESSAGE,
    message,
  };
}

export function removeGlobalMessage(message) {
  return {
    type: REMOVE_GLOBAL_MESSAGE,
    message,
  };
}

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
