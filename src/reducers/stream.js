import {
  RECEIVE_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_STREAM_LOADING,
} from 'actions/types';

const nullState = {
  streams: [],
  pc: null,
  loading: false,
  participants: [],
};

const stream = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_STREAM:
      return {
        ...state,
        streams: [
          ...state.streams.filter(({ id }) => id !== action.stream.id),
          action.stream,
        ],
      };
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
