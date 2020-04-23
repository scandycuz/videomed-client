import {
  RECEIVE_AUTH_TOKEN,
  RECEIVE_SESSION_LOADING,
  RECEIVE_CURRENT_USER,
} from 'actions/types';

const nullState = {
  token: null,
  currentUser: {},
  loading: false,
};

const session = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_AUTH_TOKEN:
      return {
        ...state,
        token: action.token,
      }
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
    default:
      return state
  }
}

export default session;
