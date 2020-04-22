import { RECEIVE_AUTH_TOKEN, RECEIVE_SESSION_LOADING } from 'actions/types';

const nullState = {
  token: null,
  loading: true,
};

const session = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_AUTH_TOKEN:
      return {
        ...state,
        token: action.token,
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
