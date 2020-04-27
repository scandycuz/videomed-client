import React, { useEffect, useRef } from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { FiMinimize, FiPhone } from "react-icons/fi";
import Box from 'components/core/Box';
import Video from 'components/core/Video';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button/Base';
import PeerConnection from 'util/PeerConnection';

export function RoomFullScreen({ theme, streams, setFullScreen, closeStream }) {
  const self = useRef();
  const guest = useRef();

  const alone = streams.self && !streams.guest;

  useEffect(() => {
    if (streams.self) {
      PeerConnection.attachStream(self.current, streams.self);
    }
    if (streams.guest) {
      PeerConnection.attachStream(guest.current, streams.guest);
    }
  });

  function toggleFullScreen() {
    setFullScreen(false);
  }

  function handleEndCall() {
    toggleFullScreen();
    closeStream();
  }

  return (
    <Box
      position="fixed"
      zIndex="1000"
      justify="space-between"
      background="black.dark"
      top="0"
      right="0"
      bottom="0"
      left="0"
    >
      <Box
        align="flex-start"
        height="calc(100vh - 4rem)"
      >
        <Box
          display="flex"
          position={alone ? 'relative' : 'absolute'}
          width={alone ? '100%' : '12rem'}
          top={alone ? undefined : '0.85rem'}
          right={alone ? undefined : '0.85rem'}
          borderRadius="5px"
          overflow="hidden"
        >
          <Video
            ref={self}
            autoPlay
            muted
          />
        </Box>

        <Box
          display={streams.guest ? 'flex' : 'none'}
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

      { streams.self && (
        <Box
          padding="0 2rem 0 1rem"
          align="center"
          height="4rem"
          direction="row"
          justify="space-between"
        >
          <Button color="white" onClick={toggleFullScreen}>
            <Box direction="row" align="center">
              <Box marginRight="0.5rem">
                <FiMinimize color={theme.white} size="1.75rem" />
              </Box>

              <Typography color="white">Minimize</Typography>
            </Box>
          </Button>

          <Button onClick={handleEndCall}>
            <Box direction="row" align="center">
              <Box marginRight="1rem">
                <FiPhone color={theme.critical.main} size="1.75rem" />
              </Box>

              <Typography color="critical">
                End call
              </Typography>
            </Box>
          </Button>
        </Box>
      )}
    </Box>
  );
}

RoomFullScreen.propTypes = {
  streams: PropTypes.object,
  theme: PropTypes.object.isRequired,
  closeStream: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default withTheme(RoomFullScreen);
