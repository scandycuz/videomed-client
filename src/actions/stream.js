import Cable from 'util/Cable';
import Stream from 'util/Stream';
import {
  RECEIVE_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_STREAM_LOADING,
  OFFER,
  ANSWER,
  EXCHANGE,
} from 'actions/types';

export function inviteToRoom(userId) {
  return async function(dispatch, getState) {
    try {
      const { session, stream } = getState();
      const { token, currentUser } = session;
      const localStream = stream.streams[0];

      const pc = stream.pc || await dispatch(createPC(token, localStream, true));

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      subscription.send('create', {
        type: OFFER,
        from: currentUser.id,
        to: userId,
        sdp: JSON.stringify(pc.localDescription),
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function handleOffer(data) {
  return async function(dispatch, getState) {
    try {
      const sdp = JSON.parse(data.sdp);
      const state = getState();
      const { token, currentUser } = state.session;

      const localStream = await dispatch(createStream({ audio: true, video: true }));

      const pc = state.stream.pc || await dispatch(createPC(token, localStream));
      pc.setRemoteDescription(new RTCSessionDescription(sdp));

      const answer = await pc.createAnswer();
      pc.setLocalDescription(answer);

      dispatch(receiveParticipant(data.from));

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      subscription.send('create', {
        type: ANSWER,
        from: currentUser.id,
        to: data.from,
        sdp: JSON.stringify(pc.localDescription),
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function handleAnswer(data) {
  return async function(dispatch, getState) {
    try {
      const sdp = JSON.parse(data.sdp);
      const { stream } = getState();
      const { pc } = stream;

      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch(e) {
      console.log(e);
    }
  }
}

export function handleExchange(data) {
  return async function(dispatch, getState) {
    const { pc } = getState().stream;

    if (data.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)));
        console.log('Ice candidate added');
      } catch(e) {
        console.log(e);
      }
    }
  }
}

export function createStream(constraints) {
  return async function(dispatch) {
    try {
      dispatch(receiveStreamLoading(true));

      const localStream = await Stream.createStream(constraints);

      dispatch(receiveStream(localStream));
      dispatch(receiveStreamLoading(false));

      return localStream;
    } catch(e) {
      receiveStreamLoading(false);
      console.log(e);
    }
  }
}

function createPC(token, localStream, isOffer = false) {
  return async function(dispatch, getState) {
    try {
      const state = getState();
      const { currentUser } = state.session;
      const { participants, streams } = state.stream;

      const stream = new Stream(token);
      await stream.initialize(localStream);
      const pc = stream.pc;

      if (isOffer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
      }

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      pc.onicecandidate = (event) => {
        console.log('Ice candidate received');

        if (event.candidate) {
          participants.forEach((id) => {
            subscription.send('create', {
              type: EXCHANGE,
              from: currentUser.id,
              to: id,
              candidate: JSON.stringify(event.candidate)
            });
          });
        }
      };

      pc.ontrack = (event) => {
        console.log('Stream received');
        dispatch(receiveStream(event.streams[0]));
      };

      pc.onnegotiationneeded = async () => {
        console.log('Negotiation needed');

        participants.forEach((id) => {
          dispatch(inviteToRoom(id));
        });
      };

      dispatch(receivePeerConnection(pc));

      return pc;
    } catch(e) {
      console.log(e);
    }
  }
}

export function receiveMessage(message) {
  return function(dispatch, getState) {
    const { currentUser } = getState().session;

    if (message.from === currentUser.id) return;

    switch(message.type) {
      case OFFER:
        return dispatch(handleOffer(message));
      case ANSWER:
        return dispatch(handleAnswer(message));
      default:
        return;
    }
  }
}

export function receiveStream(stream) {
  return {
    type: RECEIVE_STREAM,
    stream,
  }
}

export function receivePeerConnection(pc) {
  return {
    type: RECEIVE_PEER_CONNECTION,
    pc,
  }
}

export function receiveParticipant(participant) {
  return {
    type: RECEIVE_PARTICIPANT,
    participant,
  }
}

export function receiveStreamLoading(loading) {
  return {
    type: RECEIVE_STREAM_LOADING,
    loading,
  }
}
