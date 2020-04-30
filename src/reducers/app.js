import {
  RECEIVE_GLOBAL_MESSAGE,
  REMOVE_GLOBAL_MESSAGE,
  RECEIVE_GLOBAL_ERROR,
  REMOVE_GLOBAL_ERROR,
} from 'actions/types';

const nullState = {
  messages: [],
  errors: [],
};

const app = (state = nullState, action) => {
  switch (action.type) {
    case REMOVE_GLOBAL_MESSAGE:
      return {
        ...state,
        messages: state.messages.slice(0, -1),
      };
    case RECEIVE_GLOBAL_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, 4),
          action.message,
        ],
      };
    case RECEIVE_GLOBAL_ERROR:
      return {
        ...state,
        errors: [
          action.error,
          ...state.errors,
        ],
      };
    case REMOVE_GLOBAL_ERROR:
      return {
        ...state,
        errors: state.errors.slice(0, -1),
      };
    default:
      return state
  }
}

export default app;
