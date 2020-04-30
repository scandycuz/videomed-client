import {
  RECEIVE_USER,
  RECEIVE_USERS,
  RECEIVE_ONLINE_STATUS,
  RECEIVE_ONLINE_STATUSES,
} from 'actions/types';
import { asObject } from 'util/methods';

const nullState = {
  users: [],
  onlineStatus: {},
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
          ...state.users.filter(({ id }) => id !== parseInt(action.user.id)),
          action.user,
        ],
      }
    case RECEIVE_ONLINE_STATUSES:
      return {
        ...state,
        onlineStatus: {
          ...state.onlineStatus,
          ...asObject(action.onlineStatuses, 'userId', 'status'),
        },
      };
    case RECEIVE_ONLINE_STATUS:
      return {
        ...state,
        onlineStatus: {
          ...state.onlineStatus,
          [action.onlineStatus.userId]: action.onlineStatus.status,
        },
      };
    default:
      return state
  }
}

export default users;
