import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Room from './Room';
import RoomFullScreen from './RoomFullScreen';

function VideoStream({
  streams,
  fullScreen,
  createStream,
  closeStream,
  inviteToRoom,
  setFullScreen,
}) {
  function handleCreateStream() {
    // createStream({ audio: true, video: true });
    createStream({ audio: false, video: true });
  }

  function handleInviteToRoom(userId) {
    inviteToRoom(userId);
  }

  return (
    <Box
      align="center"
      padding="1rem"
    >
      { fullScreen ? (
        <RoomFullScreen
          streams={streams}
          closeStream={closeStream}
          setFullScreen={setFullScreen}
        />
      ) : (
        <Room
          streams={streams}
          closeStream={closeStream}
          setFullScreen={setFullScreen}
        />
      )}

      <Box marginTop="1rem" direction="row" justify="center">
        <Box marginRight="2rem">
          <Button onClick={handleCreateStream}>
            Create
          </Button>
        </Box>

        <Box marginLeft="2rem">
          <Button onClick={() => handleInviteToRoom(2)}>
            Invite
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

VideoStream.propTypes = {
  streams: PropTypes.object,
  fullScreen: PropTypes.bool,
  setFullScreen: PropTypes.func,
  createStream: PropTypes.func.isRequired,
  closeStream: PropTypes.func.isRequired,
  inviteToRoom: PropTypes.func.isRequired,
};

export default VideoStream;
