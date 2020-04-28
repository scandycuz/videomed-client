import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Room from './Room';
import RoomFullScreen from './RoomFullScreen';

function VideoStream({
  streams,
  fullScreen,
  closeStream,
  setFullScreen,
}) {
  return (
    <Box
      align="center"
      padding="1rem"
      position="relative"
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
    </Box>
  );
}

VideoStream.propTypes = {
  theme: PropTypes.object,
  streams: PropTypes.object,
  loading: PropTypes.bool,
  fullScreen: PropTypes.bool,
  setFullScreen: PropTypes.func,
  closeStream: PropTypes.func.isRequired,
};

export default VideoStream;
