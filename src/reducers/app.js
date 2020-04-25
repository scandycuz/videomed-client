import {
  RECEIVE_GLOBAL_ERROR,
  REMOVE_GLOBAL_ERROR,
} from 'actions/types';

const nullState = {
  errors: [],
};

const app = (state = nullState, action) => {
  switch (action.type) {
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
