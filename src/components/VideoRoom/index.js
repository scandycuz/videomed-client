import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Box from 'components/core/Box';
import PulseLoader from "react-spinners/PulseLoader";
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
    >
      { loading ? (
        <Box marginTop="10rem">
          <PulseLoader
            color={theme.secondary.light}
            loading={loading}
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
