import {
  RECEIVE_USER,
  RECEIVE_USERS,
} from 'actions/types';

const nullState = {
  users: [],
};

const users = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
      }
    case RECEIVE_USER:
      return {
        ...state,
        users: [
          ...state.users,
          action.users,
        ],
      }
    default:
      return state
  }
}

export default users;
