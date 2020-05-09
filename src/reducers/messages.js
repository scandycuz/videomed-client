import List from 'util/List';
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  RECEIVE_ACTIVE_CONVERSATION,
  RECEIVE_MESSAGE_LOADING,
} from 'actions/types';

const nullState = {
  active: null,
  loading: false,
  conversations: [],
  messages: [],
};

const stream = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_ACTIVE_CONVERSATION:
      return {
        ...state,
        active: action.active,
      };
    case RECEIVE_CONVERSATIONS:
      return {
        ...state,
        conversations: action.conversations,
      };
    case RECEIVE_CONVERSATION:
      return {
        ...state,
        conversations: List.replace(state.conversations, action.conversation),
      };
    case RECEIVE_MESSAGE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case RECEIVE_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.filter((m) => !m._placeholder ),
          action.message,
        ],
      };
    default:
      return state
  }
}

export default stream;
