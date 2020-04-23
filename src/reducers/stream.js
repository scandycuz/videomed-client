import {
  RECEIVE_STREAM,
  RECEIVE_STREAM_LOADING,
  RECEIVE_STREAM_CONSTRAINTS,
} from 'actions/types';

const nullState = {
  stream: null,
  loading: false,
  constraints: {
    video: {
      width: {
        min: 1280,
      },
      height: {
        min: 720,
      },
    },
    audio: false,
  },
};

const stream = (state = nullState, action) => {
  switch (action.type) {
    case RECEIVE_STREAM:
      return {
        ...state,
        stream: action.stream,
      }
    case RECEIVE_STREAM_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    case RECEIVE_STREAM_CONSTRAINTS:
      return {
        ...state,
        constraints: {
          ...state.constraints,
          ...action.constraints,
        },
      };
    default:
      return state
  }
}

export default stream;
