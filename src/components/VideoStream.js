import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Box from './core/Box';

const Video = styled.video`
  max-width: 100vw;
`;

function VideoStream({ hd, audio }) {
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
    async function fetchData() {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      try {
        videoRef.current.srcObject = stream;
      } catch(e) {
        console.log(e);
      }
    }

    fetchData();
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

export default VideoStream;
