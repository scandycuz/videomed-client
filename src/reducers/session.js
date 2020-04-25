import {
  RECEIVE_AUTH_TOKEN,
  RECEIVE_LOGOUT,
  RECEIVE_SESSION_LOADING,
  RECEIVE_SESSION_ERROR,
  RECEIVE_CURRENT_USER,
} from 'actions/types';

const nullState = {
  token: null,
  currentUser: {},
  loading: true,
  error: '',
};

const session = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_AUTH_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case RECEIVE_LOGOUT:
      return nullState;
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      }
    case RECEIVE_SESSION_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case RECEIVE_SESSION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state
  }
}

export default session;
