import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import PulseLoader from "react-spinners/PulseLoader";
import Box from 'components/core/Box';
import Room from './Room';
import RoomFullScreen from './RoomFullScreen';

function VideoStream({
  theme,
  streams,
  loading,
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
      { loading ? (
        <Box
          justify="center"
          align="center"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="5000"
          background="white"
          paddingTop="10rem"
        >
          <PulseLoader
            color={theme.secondary.light}
            loading
          />
        </Box>
      ) : fullScreen ? (
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

export default withTheme(VideoStream);
