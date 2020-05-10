import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import PulseLoader from "react-spinners/PulseLoader";
import { FiMaximize, FiPhone, FiMessageCircle } from "react-icons/fi";
import Box from 'components/core/Box';
import Button from 'components/core/Button';
import Video from 'components/core/Video';
import Typography from 'components/core/Typography';
import Badge from 'components/core/Badge';
import PeerConnection from 'util/PeerConnection';
import Messages from './Messages';

export function Room({
    theme,
    streams,
    loading,
    currentUser,
    activeConversation,
    participant,
    messages,
    conversations,
    createMessage,
    startMessaging,
    setFullScreen,
    closeStream,
    readConversation,
    closeConversation,
  }) {
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
  }, [streams]);

  function toggleFullScreen() {
    setFullScreen(true);
  }

  function handleSubmit(message) {
    createMessage(activeConversation, message);
  }

  const conversation = conversations.find(({ participants }) => {
    const ids = participants.map(({ id }) => id);
    const others = ids.filter((id) => id !== currentUser.id);

    return others.includes(participant);
  });

  return (
    <Box
      direction="row"
      justify="center"
      width="100%"
    >
      <Box width="20%" paddingRight="0.5rem">
        <Box>
          { loading ? (
            <Box paddingTop="6rem" align="center">
              <PulseLoader
                color={theme.secondary.light}
                loading
              />
            </Box>
          ) : activeConversation ? (
            <Messages
              currentUser={currentUser}
              messages={messages}
              activeConversation={activeConversation}
              readConversation={readConversation}
              onSubmit={handleSubmit}
              onClose={closeConversation}
            />
          ) : null }
        </Box>
      </Box>

      <Box width="80%" direction="column" align="center">
        <Box
          width="100%"
          justify="center"
          align="flex-start"
          direction={streams.guest ? 'row-reverse' : 'row'}
        >
          <Box
            display="flex"
            width={alone ? '75%' : '25%'}
            maxWidth={alone && '98vh'}
            paddingLeft={!alone && '0.5rem'}
          >
            <Box
              width="100%"
              borderRadius="5px"
              overflow="hidden"
            >
              <Video
                ref={self}
                playsInline
                autoPlay
                muted
              />
            </Box>
          </Box>

          <Box
            display="flex"
            visibility={streams.guest ? 'visible' : 'hidden'}
            width={alone ? '25%' : '75%'}
            maxWidth="98vh"
            borderRadius="5px"
            overflow="hidden"
          >
            <Video
              ref={guest}
              playsInline
              autoPlay
            />
          </Box>
        </Box>

        { streams.self && (
          <Box
            width="100%"
            direction="row"
            justify="center"
            align="center"
          >
            <Box
              padding="0.75rem 0"
              direction="row"
              justify="space-between"
              align="center"
              width="75%"
              maxWidth="98vh"
            >
              <Box direction="row" align="center" justify="flex-start">
                <Box marginRight="0.5rem">
                  <Badge count={!activeConversation && conversation ? conversation.unread : 0}>
                    <Button
                      plain
                      round
                      full={false}
                      onClick={activeConversation ? null : () => startMessaging(participant)}
                    >
                      <Box direction="row" align="center">
                        <Box marginRight="0.5rem">
                          <Typography>Message</Typography>
                        </Box>

                        <FiMessageCircle size="1.75rem" />
                      </Box>
                    </Button>
                  </Badge>
                </Box>

                <Button plain round full={false} onClick={toggleFullScreen}>
                  <Box direction="row" align="center">
                    <Box marginRight="0.5rem">
                      <Typography>Full Screen</Typography>
                    </Box>

                    <FiMaximize size="1.75rem" />
                  </Box>
                </Button>
              </Box>

              <Button critical round full={false} onClick={closeStream}>
                <Box direction="row" align="center">
                  <Box marginRight="0.5rem">
                    <FiPhone size="1.75rem" />
                  </Box>

                  <Typography color='white'>End call</Typography>
                </Box>
              </Button>
            </Box>

            <Box width="25%" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

Room.propTypes = {
  theme: PropTypes.object,
  streams: PropTypes.object,
  loading: PropTypes.bool,
  activeConversation: PropTypes.number,
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  conversations: PropTypes.array,
  participant: PropTypes.number,
  createMessage: PropTypes.func.isRequired,
  startMessaging: PropTypes.func.isRequired,
  closeStream: PropTypes.func.isRequired,
  readConversation: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default withTheme(Room);
