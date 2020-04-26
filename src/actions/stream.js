import Cable from 'util/Cable';
import Stream from 'util/Stream';
import { CONSTRAINTS } from 'util/constants';
import {
  RECEIVE_STREAM,
  REMOVE_STREAM,
  END_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_FULL_SCREEN,
  RECEIVE_STREAM_LOADING,
  JOIN_ROOM,
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
      const { stream, session } = getState();
      const { currentUser } = session;
      const { streams } = stream;

      if (!streams.self) await dispatch(createStream(CONSTRAINTS));

      dispatch(receiveStreamLoading(true));
      setTimeout(() => {
        dispatch(receiveStreamLoading(false));
      }, 5000);

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      subscription.send('create', {
        type: JOIN_ROOM,
        from: currentUser.id,
        to: userId,
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export function joinRoom(from) {
  return async function(dispatch, getState) {
    const { stream, session } = getState();
    const { token, currentUser } = session;
    const { streams } = stream;

    const localStream = streams.self || await dispatch(createStream(CONSTRAINTS));
    const pc = await dispatch(createPC(token, localStream, true));

    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    subscription.send('create', {
      type: EXCHANGE,
      from: currentUser.id,
      to: from,
      sdp: JSON.stringify(pc.localDescription),
    });
  }
}

/**
 * Handles data exchanged
 * between call participants.
 * @param {object} data information to be exchanged
 */
export function handleExchange(data) {
  return async function(dispatch, getState) {
    const { session, stream } = getState();
    const { token, currentUser } = session;
    const { streams } = stream;

    const localStream = streams.self || await dispatch(createStream(CONSTRAINTS));
    const pc = stream.pc || await dispatch(createPC(token, localStream));

    dispatch(receiveParticipant(data.from));

    if (data.candidate) {
      try {
        pc.addIceCandidate(data.candidate);
        console.log('Ice candidate added');
      } catch(e) {
        console.log(e);
      }
    }

    if (data.sdp) {
      try {
        const sdp = JSON.parse(data.sdp);

        await pc.setRemoteDescription(sdp);

        if (sdp.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          const subscription = Cable.subscription({
            channel: 'SessionChannel',
            id: currentUser.id,
          });

          subscription.send('create', {
            type: EXCHANGE,
            from: currentUser.id,
            to: data.from,
            sdp: JSON.stringify(pc.localDescription),
          });
        }
      } catch(e) {
        console.log(e);
      }
    }
  }
}

export function handleNegotiationNeeded() {
  return async function(dispatch, getState) {
    const { stream, session } = getState();
    const { currentUser } = session;
    const { participant, pc } = stream;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    subscription.send('create', {
      type: EXCHANGE,
      from: currentUser.id,
      to: participant,
      sdp: JSON.stringify(pc.localDescription),
    });
  }
}

/**
 * Creates a media stream
 * and peer connection.
 * @param  {object} CONSTRAINTS video and audio CONSTRAINTS for the stream
 * @return {object}             created media stream
 */
export function createStream(CONSTRAINTS) {
  return async function(dispatch) {
    try {
      dispatch(receiveStreamLoading(true));

      const localStream = await Stream.createStream(CONSTRAINTS);

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

        dispatch(handleNegotiationNeeded());
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
      const { participant, streams, pc } = stream;

      if (pc) pc.close();
      for (const key in streams) {
        Stream.stopStream(streams[key]);
      }

      dispatch(endStream());

      const subscription = Cable.subscription({
        channel: 'SessionChannel',
        id: currentUser.id,
      });

      subscription.send('create', {
        type: REMOVE_STREAM,
        from: currentUser.id,
        to: participant,
      });

      dispatch(receiveStreamLoading(false));
    } catch(e) {
      receiveStreamLoading(false);
      console.log(e);
    }
  }
}

/**
 * Closes and removes the
 * stream for another user.
 * @param {string} user identifer for the user
 */
export function stopStream(user) {
  return function(dispatch, getState) {
    const { streams } = getState().stream;
    Stream.stopStream(streams[user]);

    dispatch(removeStream());
  }
}

export function receiveMessage(message) {
  return function(dispatch, getState) {
    const { currentUser } = getState().session;

    if (message.from === currentUser.id) return;

    switch(message.type) {
      case JOIN_ROOM:
        return dispatch(joinRoom(message.from));
      case EXCHANGE:
        return dispatch(handleExchange(message));
      case REMOVE_STREAM:
        return dispatch(stopStream('guest'));
      default:
        return;
    }
  }
}

function handleIceCandidate(event) {
  return function(dispatch, getState) {
    const { stream, session } = getState();
    const { currentUser } = session;
    const { participant } = stream;

    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    if (event.candidate) {
      subscription.send('create', {
        type: EXCHANGE,
        from: currentUser.id,
        to: participant,
        candidate: JSON.stringify(event.candidate)
      });
    } else {
      dispatch(receiveStreamLoading(false));
    }
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
