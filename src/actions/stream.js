import Cable from 'util/Cable';
import Stream from 'util/Stream';
import {
  RECEIVE_STREAM,
  RECEIVE_STREAM_LOADING,
  RECEIVE_STREAM_CONSTRAINTS,
  EXCHANGE,
} from 'actions/types';

export function createStream() {
  return async function(dispatch, getState) {
    try {
      const { session, stream } = getState();
      const { token } = session;
      const { constraints } = stream;

      dispatch(receiveStreamLoading(true));

      const localStream = await createPC(token, constraints, true);

      dispatch(receiveStream(localStream));
      dispatch(receiveStreamLoading(false));
    } catch(e) {
      receiveStreamLoading(false);
      console.log(e);
    }
  }
}

export function inviteToStream(userId) {
  return function(dispatch, getState) {
    try {
      const { session, stream } = getState();
      const { currentUser } = session;
      const localStream = stream.stream;

      const subscription = Cable.subscription({
        channel: 'UserChannel',
        id: currentUser.id,
      });

      subscription.send('invite', {
        type: EXCHANGE,
        from: currentUser.id,
        to: userId,
        sdp: JSON.stringify(localStream.pc.localDescription),
      });
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
      case EXCHANGE:
        if (message.to !== currentUser.id) return;
        return dispatch(exchange(message));
      default:
        return;
    }
  }
}

function exchange(data) {
  return async function(dispatch, getState) {
    const sdp = JSON.parse(data.sdp);
    const { session, stream } = getState();
    const { token } = session;
    const { constraints } = stream;

    let localStream = stream.stream;
    if (!localStream) localStream = await createPC(token, constraints);

    try {
      await localStream.pc.setRemoteDescription(new RTCSessionDescription(sdp));

      if (sdp.type === "offer") {
        const answer = await localStream.pc.createAnswer();

        localStream.pc.setLocalDescription(answer);

        // const subscription = Cable.subscription({
        //   channel: 'UserChannel',
        //   id: currentUser.id,
        // });
        //
        // subscription.send('invite', {
        //   type: EXCHANGE,
        //   from: currentUser.id,
        //   to: data.from,
        //   sdp: JSON.stringify(localStream.pc.localDescription),
        // });
      }
    } catch(e) {
      console.log(e);
    }
  }
}

async function createPC(token, constraints, isOffer = false) {
  const stream = new Stream();
  await stream.initialize(token, constraints);

  if (isOffer) {
    const offer = await stream.pc.createOffer();
    await stream.pc.setLocalDescription(offer);
  }

  return stream;
}

export function receiveStreamConstraints(constraints) {
  return {
    type: RECEIVE_STREAM_CONSTRAINTS,
    constraints,
  };
}

export function receiveStream(stream) {
  return {
    type: RECEIVE_STREAM,
    stream,
  }
}


export function receiveStreamLoading(loading) {
  return {
    type: RECEIVE_STREAM_LOADING,
    loading,
  }
}
