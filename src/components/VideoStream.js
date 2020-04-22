import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stream from 'util/Stream';
import Box from 'components/core/Box';

let stream;

const Video = styled.video`
  max-width: 100%;
`;

function VideoStream({ token, hd, audio }) {
  const video = hd ? {
    width: {
      min: 1280,
    },
    height: {
      min: 720,
    },
  } : true;

  const constraints = {
    video,
    audio,
  };

  const videoRef = useRef();

  useEffect(() => {
    async function initializeStream() {
      stream = new Stream();
      await stream.initialize(token, constraints);
      stream.attachTo(videoRef.current);
      // TEMP
      console.log(stream);
    }

    initializeStream();
  }, []);

  return (
    <Box>
      <Video
        ref={videoRef}
        autoPlay
      />
    </Box>
  );
}

VideoStream.defaultProps = {
  hd: true,
  audio: true,
};

VideoStream.propTypes = {
  token: PropTypes.string,
  hd: PropTypes.bool,
  audio: PropTypes.bool,
};

export default VideoStream;
