import Cable from 'util/Cable';
import Stream from 'util/Stream';
import {
  RECEIVE_STREAM,
  REMOVE_STREAM,
  END_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_FULL_SCREEN,
  RECEIVE_STREAM_LOADING,
  OFFER,
  ANSWER,
  EXCHANGE,
} from 'actions/types';

/**
 * Sends an invation to a user
 * to have them join the call.
 * @param {number} userId identifier for the invitee
 */
export function inviteToRoom(userId) {
  return async function(dispatch, getState) {
    try {
      const { session, stream } = getState();
      const { token, currentUser } = session;
      const localStream = stream.streams.self;

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

/**
 * Called when the user has
 * been invited to a call.
 * @param {object} data sdp information for the call
 */
export function handleOffer(data) {
  return async function(dispatch, getState) {
    try {
      const sdp = JSON.parse(data.sdp);
      const state = getState();
      const { token, currentUser } = state.session;

      dispatch(receiveParticipant(data.from));

      // const localStream = await dispatch(createStream({ audio: true, video: true }));
      const localStream = await dispatch(createStream({ audio: false, video: true }));

      const pc = state.stream.pc || await dispatch(createPC(token, localStream));
      pc.setRemoteDescription(new RTCSessionDescription(sdp));

      const answer = await pc.createAnswer();
      pc.setLocalDescription(answer);

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

/**
 * Called when the invitee has
 * responded to the invite.
 * @param {object} data sdp information for the call
 */
export function handleAnswer(data) {
  return async function(dispatch, getState) {
    try {
      const sdp = JSON.parse(data.sdp);
      const { stream } = getState();
      const { pc } = stream;

      dispatch(receiveParticipant(data.from));

      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch(e) {
      console.log(e);
    }
  }
}

/**
 * Handles additional data exchanged
 * between the call participants.
 * @param {object} data information to be exchanged
 */
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

/**
 * Creates a media stream
 * and peer connection.
 * @param  {object} constraints video and audio constraints for the stream
 * @return {object}             created media stream
 */
export function createStream(constraints) {
  return async function(dispatch) {
    try {
      dispatch(receiveStreamLoading(true));

      const localStream = await Stream.createStream(constraints);

      dispatch(receiveStream(localStream, 'self'));
      dispatch(receiveStreamLoading(false));

      return localStream;
    } catch(e) {
      receiveStreamLoading(false);
      console.log(e);
    }
  }
}

/**
 * Creates a local peer connetion using
 * the media stream.
 * @param  {string}  token           authorization token
 * @param  {object}  localStream     media stream
 * @param  {Boolean} isOffer         true if an offer to join should be sent
 * @return {object}                  the created peer connection
 */
function createPC(token, localStream, isOffer = false) {
  return async function(dispatch) {
    try {
      const stream = new Stream(token);
      await stream.initialize(localStream);
      const pc = stream.pc;

      if (isOffer) {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
      }

      pc.onicecandidate = (event) => {
        console.log('Ice candidate received');

        dispatch(handleIceCandidate(event));
      };

      pc.ontrack = (event) => {
        console.log('Stream received');

        dispatch(receiveStream(event.streams[0], 'guest'));
      };

      pc.onnegotiationneeded = async () => {
        console.log('Negotiation needed');

        dispatch(resetStream());
      };

      dispatch(receivePeerConnection(pc));

      return pc;
    } catch(e) {
      console.log(e);
    }
  }
}

/**
 * Ends the local stream, closes
 * the connection, and notifies
 * the other user.
 */
export function closeStream() {
  return function(dispatch, getState) {
    try {
      dispatch(receiveStreamLoading(true));

      const { session, stream } = getState();
      const { currentUser } = session;
      const { participants, pc } = stream;

      if (pc) pc.close();

      dispatch(endStream());

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      participants.forEach((id) => {
        subscription.send('create', {
          type: REMOVE_STREAM,
          from: currentUser.id,
          to: id,
        });
      });

      dispatch(receiveStreamLoading(false));
    } catch(e) {
      receiveStreamLoading(false);
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
      case REMOVE_STREAM:
        return dispatch(removeStream());
      default:
        return;
    }
  }
}

function handleIceCandidate(event) {
  return function(dispatch, getState) {
    const { stream, session } = getState();
    const { currentUser } = session;
    const { participants } = stream;

    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

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
  }
}

function resetStream() {
  return function(dispatch, getState) {
    const { participants, pc } = getState().stream;

    pc.close();
    dispatch(receivePeerConnection(null));

    participants.forEach((id) => {
      dispatch(inviteToRoom(id));
    });
  }
}

export function receiveStream(stream, user) {
  return {
    type: RECEIVE_STREAM,
    user,
    stream,
  };
}

export function endtream(user) {
  return {
    type: END_STREAM,
    user,
  };
}

export function receivePeerConnection(pc) {
  return {
    type: RECEIVE_PEER_CONNECTION,
    pc,
  };
}

export function endStream() {
  return {
    type: END_STREAM,
  };
}

export function removeStream() {
  return {
    type: REMOVE_STREAM,
  };
}

export function receiveParticipant(participant) {
  return {
    type: RECEIVE_PARTICIPANT,
    participant,
  };
}

export function setFullScreen(status) {
  return {
    type: RECEIVE_FULL_SCREEN,
    status,
  };
}

export function receiveStreamLoading(loading) {
  return {
    type: RECEIVE_STREAM_LOADING,
    loading,
  };
}
