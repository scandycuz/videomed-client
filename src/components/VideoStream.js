import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import Button from 'components/core/Button';

const Video = styled.video`
  max-width: 100%;
`;

function VideoStream({ stream, createStream, inviteToStream }) {
  const videoRef = useRef();

  function handleInviteToStream(userId) {
    inviteToStream(userId);
  }

  useEffect(() => {
    if (stream) stream.attachTo(videoRef.current);
  }, [stream]);

  return (
    <Box
      align="center"
      padding="1rem"
    >
      <Video
        ref={videoRef}
        autoPlay
      />

      <Box marginTop="1rem" direction="row" justify="center">
        <Box marginRight="2rem">
          <Button onClick={createStream}>
            Create stream
          </Button>
        </Box>

        <Box marginLeft="2rem">
          <Button onClick={() => handleInviteToStream(2)}>
            Invite to Stream
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

VideoStream.propTypes = {
  stream: PropTypes.object,
  createStream: PropTypes.func,
  inviteToStream: PropTypes.func,
};

export default VideoStream;
