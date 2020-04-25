import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FiMaximize, FiPhone } from "react-icons/fi";
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Video from 'components/core/Video';
import Typography from 'components/core/Typography';
import Stream from 'util/Stream';

export function Room({ streams, setFullScreen, closeStream }) {
  const self = useRef();
  const guest = useRef();

  const alone = streams.self && !streams.guest;

  useEffect(() => {
    if (streams.self) Stream.attachStream(self.current, streams.self);
    if (streams.guest) Stream.attachStream(guest.current, streams.guest);
  });

  function toggleFullScreen() {
    setFullScreen(true);
  }

  return (
    <Box position="relative" width="98vh">
      <Box>
        <Box
          display="flex"
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
          padding="0.75rem 0"
          direction="row"
          justify="space-between"
          align="center"
        >
          <Button plain round full={false} onClick={toggleFullScreen}>
            <Box direction="row" align="center">
              <Box marginRight="0.5rem">
                <Typography>Full Screen</Typography>
              </Box>

              <FiMaximize size="1.75rem" />
            </Box>
          </Button>

          <Button critical round full={false} onClick={closeStream}>
            <Box direction="row" align="center">
              <Box marginRight="0.5rem">
                <FiPhone size="1.75rem" />
              </Box>

              <Typography color='white'>End call</Typography>
            </Box>
          </Button>
        </Box>
      )}
    </Box>
  );
}

Room.propTypes = {
  streams: PropTypes.object,
  closeStream: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default Room;
