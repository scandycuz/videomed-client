import React, { useEffect, useRef } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { FiMinimize, FiPhone } from "react-icons/fi";
import Box from 'components/core/Box';
import Video from 'components/core/Video';
import Typography from 'components/core/Typography';
import Stream from 'util/Stream';

export function RoomFullScreen({ theme, streams, setFullScreen, closeStream }) {
  const self = useRef();
  const guest = useRef();

  const alone = streams.self && !streams.guest;

  useEffect(() => {
    if (streams.self) Stream.attachStream(self.current, streams.self);
    if (streams.guest) Stream.attachStream(guest.current, streams.guest);
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
      justify="space-between"
      background={theme.black.dark}
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
          display={streams.self ? 'flex' : 'none'}
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
          <MinimizeButton
            full={false}
            onClick={toggleFullScreen}
          >
            <Box direction="row" align="center">
              <Box marginRight="0.5rem">
                <FiMinimize size="1.75rem" />
              </Box>

              <Typography color="white">Minimize</Typography>
            </Box>
          </MinimizeButton>

          <EndCallButton
            full={false}
            onClick={handleEndCall}
          >
            <Box direction="row" align="center">
              <Box marginRight="1rem">
                <FiPhone color={theme.critical.main} size="1.75rem" />
              </Box>

              <Typography color="critical">
                End call
              </Typography>
            </Box>
          </EndCallButton>
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

const buttonStyles = `
  background: transparent;
  opacity: 0.85;
  font-size: 1.25rem;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background: transparent !important;
    opacity: 1;
  }
`;

const MinimizeButton = styled.button`
  ${buttonStyles}

  color: ${({ theme }) => theme.white};
`;

const EndCallButton = styled.button`
  ${buttonStyles}
`;
