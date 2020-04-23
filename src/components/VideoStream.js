import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Video from 'components/core/Video';
import Stream from 'util/Stream';

function VideoStream({ streams, createStream, inviteToRoom }) {
  const self = useRef();
  const guest = useRef();

  const alone = streams.length === 1;

  useEffect(() => {
    if (streams.length === 1) Stream.attachStream(self.current, streams[0]);
    if (streams.length === 2) Stream.attachStream(guest.current, streams[1]);
  }, [streams]);

  function handleCreateStream() {
    createStream({ audio: true, video: true });
  }

  function handleInviteToRoom(userId) {
    inviteToRoom(userId);
  }

  return (
    <Box
      align="center"
      padding="1rem"
    >
      <Box position="relative" width="98vh">
        <Box
          display={streams[0] ? 'flex' : 'none'}
          position={alone ? 'relative' : 'absolute'}
          width={alone ? '100%' : '12rem'}
          right={alone ? undefined : '-12.75rem'}
          borderRadius="5px"
          overflow="hidden"
          height="auto"
        >
          <Video
            ref={self}
            autoPlay
            muted
          />
        </Box>

        <Box
          display={streams[1] ? 'flex' : 'none'}
          width="100%"
          borderRadius="5px"
          overflow="hidden"
        >
          <Video
            ref={guest}
            autoPlay
          />
        </Box>
      </Box>

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
  streams: PropTypes.array,
  createStream: PropTypes.func,
  inviteToRoom: PropTypes.func,
};

export default VideoStream;
