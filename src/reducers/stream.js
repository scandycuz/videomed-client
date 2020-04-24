import {
  RECEIVE_STREAM,
  REMOVE_STREAM,
  END_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_FULL_SCREEN,
  RECEIVE_STREAM_LOADING,
} from 'actions/types';

const nullState = {
  streams: {},
  pc: null,
  participants: [],
  loading: false,
  fullScreen: false,
};

const stream = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_STREAM:
      return {
        ...state,
        streams: {
          ...state.streams,
          [action.user]: action.stream,
        },
      };
    case END_STREAM:
      return {
        ...state,
        pc: null,
        streams: {},
      };
    case REMOVE_STREAM:
      return {
        ...state,
        participants: [],
        streams: {
          self: state.streams.self,
        }
      }
    case RECEIVE_PEER_CONNECTION:
      return {
        ...state,
        pc: action.pc,
      }
    case RECEIVE_PARTICIPANT:
      return {
        ...state,
        participants: [
          ...state.participants,
          action.participant,
        ],
      };
    case RECEIVE_FULL_SCREEN:
      return {
        ...state,
        fullScreen: action.status,
      };
    case RECEIVE_STREAM_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state
  }
}

export default stream;
