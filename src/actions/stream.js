import Cable from 'util/Cable';
import PeerConnection from 'util/PeerConnection';
import {
  RECEIVE_STREAM,
  REMOVE_STREAM,
  END_STREAM,
  RECEIVE_PEER_CONNECTION,
  RECEIVE_PARTICIPANT,
  RECEIVE_FULL_SCREEN,
  RECEIVE_STREAM_LOADING,
  RECEIVE_OFFER_STATUS,
  RECEIVE_POLITE_STATUS,
  REQUEST_CALL,
  ACCEPT_CALL,
  JOIN_CALL,
  EXCHANGE,
} from 'actions/types';

/**
 * Sets the user up for a call and
 * sends a request to another user.
 * @param {number} userId identifer for the peer
 */
export function requestCall(userId) {
  return async function(dispatch, getState) {
    dispatch(receiveStreamLoading(true));
    setTimeout(() => {
      dispatch(receiveStreamLoading(false));
    }, 12000);

    const { currentUser } = getState().session;

    console.log('creating peer connection');
    const pc = await dispatch(createPeerConnection());

    console.log('creating stream');
    const stream = await dispatch(createStream({ video: true, audio: true }));

    console.log('attaching stream to peer connection');
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }

    console.log('sending connection request to peer');
    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    subscription.send('create', {
      type: REQUEST_CALL,
      from: currentUser.id,
      to: userId,
    });
  }
}

/**
 * Accepts an incoming call, sets up
 * the peer connection, and sends the
 * description back to the requester.
 * @param {object} data information for the incoming call request
 */
export function acceptCall(data) {
  return async function(dispatch, getState) {
    const { currentUser } = getState().session;

    dispatch(receiveParticipant(data.from));

    console.log('creating peer connection');
    const pc = await dispatch(createPeerConnection());

    console.log('creating stream');
    const stream = await dispatch(createStream({ video: true, audio: true }));

    console.log('attaching stream to peer connection');
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }

    // candidates will start coming, but everyone has a pc so its ok
    console.log('setting local description');
    await pc.setLocalDescription();

    console.log('sending acceptance and local description to peer');
    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    subscription.send('create', {
      type: ACCEPT_CALL,
      from: currentUser.id,
      to: data.from,
      sdp: JSON.stringify(pc.localDescription),
    });
  }
}

/**
 * Joins the requested call, accepts
 * the remote description and replies
 * with the local descrption.
 * @param {object} data information about the connection
 */
export function joinCall(data) {
  return async function(dispatch, getState) {
    const { currentUser } = getState().session;
    const { pc } = getState().stream;

    const sdp = JSON.parse(data.sdp);

    dispatch(receiveParticipant(data.from));

    console.log('setting remote description');
    await pc.setRemoteDescription(sdp);
    console.log('setting local description');
    await pc.setLocalDescription();

    console.log('sending acceptance and local description to peer');
    const subscription = Cable.subscription({
      channel: 'SessionChannel',
      id: currentUser.id,
    });

    subscription.send('create', {
      type: JOIN_CALL,
      from: currentUser.id,
      to: data.from,
      sdp: JSON.stringify(pc.localDescription),
    });
  }
}

/**
 * Sets the incoming data as the remote
 * description and completes the setup.
 * @param {object} data information about the connection
 */
export function startCall(data) {
  return async function(dispatch, getState) {
    try {
      const { pc } = getState().stream;

      const sdp = JSON.parse(data.sdp);

      console.log('setting remote description');
      await pc.setRemoteDescription(sdp);
    } catch(e) {
      console.log(e);
    }
  }
}

/**
 * Handles data exchanged
 * between call participants.
 * @param {object} data information to be exchanged
 */
export function handleExchange(data) {
  return async function(dispatch, getState) {
    const { stream } = getState();

    if (data.candidate) {
      const pc = stream.pc;

      try {
        const candidate = JSON.parse(data.candidate);
        pc.addIceCandidate(candidate);
        console.log('ice candidate added');
      } catch(e) {
        console.log(e);
      }
    }
  }
}

/**
 * Creates a media stream.
 * @param  {object} constraints video and audio constraints for the stream
 * @return {object}             created media stream
 */
export function createStream(constraints) {
  return async function(dispatch) {
    try {
      const stream = await PeerConnection.createStream(constraints);

      dispatch(receiveStream(stream, 'self'));

      return stream;
    } catch(e) {
      receiveStreamLoading(false);
      console.log(e);
    }
  }
}

export function createPeerConnection() {
  return async function(dispatch, getState) {
    const { token } = getState().session;

    const pc = await new PeerConnection(token).initialize();

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ice candidate received');
        dispatch(handleIceCandidate(event));
      } else {
        console.log('no more candidatates');
        dispatch(receiveStreamLoading(false));
      }
    };

    pc.ontrack = ({ track, streams }) => {
      console.log('adding track');
      track.onunmute = () => {
        if (getState().stream.streams.guest) return;

        dispatch(receiveStream(streams[0], 'guest'));
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log(`ice status: ${pc.iceConnectionState}`);

      if (pc.iceConnectionState === "failed") {
        console.log('restarting ice connection');
        pc.restartIce();
      }
    };

    dispatch(receivePeerConnection(pc));

    return pc;
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
      console.log('closing the stream');

      dispatch(receiveStreamLoading(true));

      const { session, stream } = getState();
      const { currentUser } = session;
      const { participant, streams, pc } = stream;

      if (pc) pc.close();
      for (const key in streams) {
        PeerConnection.stopStream(streams[key]);
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
    } catch(e) {
      console.error(e);
    } finally {
      receiveStreamLoading(false);
    }
  }
}

/**
 * Closes and removes the
 * stream for a user.
 * @param {string} user identifer for the user
 */
export function stopStream(user) {
  return function(dispatch, getState) {
    console.log('stopping guest stream');
    const { streams } = getState().stream;
    PeerConnection.stopStream(streams[user]);

    dispatch(removeStream());
  }
}

export function receiveMessage(message) {
  return function(dispatch, getState) {
    const { currentUser } = getState().session;

    if (message.from === currentUser.id) return;

    switch(message.type) {
      case REQUEST_CALL:
        console.log('accepting call');
        return dispatch(acceptCall(message));
      case ACCEPT_CALL:
        console.log('joining call');
        return dispatch(joinCall(message));
      case JOIN_CALL:
        console.log('starting the call');
        return dispatch(startCall(message));
      case EXCHANGE:
        console.log('exchanging data');
        return dispatch(handleExchange(message));
      case REMOVE_STREAM:
        console.log('removing guest stream')
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
    stream,
    user,
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

export function setOfferStatus(status) {
  return {
    type: RECEIVE_OFFER_STATUS,
    status,
  };
}

export function setPoliteness(status) {
  return {
    type: RECEIVE_POLITE_STATUS,
    status,
  };
}
