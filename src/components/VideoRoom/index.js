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
  messageLoading,
  fullScreen,
  participant,
  currentUser,
  messages,
  conversations,
  activeConversation,
  createMessage,
  startMessaging,
  closeStream,
  readConversation,
  closeConversation,
  setFullScreen,
}) {
  return (
    <Box
      align="stretch"
      padding="1rem"
      position="relative"
      width="100%"
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
          activeConversation={activeConversation}
          participant={participant}
          startMessaging={startMessaging}
          closeStream={closeStream}
          setFullScreen={setFullScreen}
        />
      ) : (
        <Room
          streams={streams}
          activeConversation={activeConversation}
          currentUser={currentUser}
          participant={participant}
          messages={messages}
          conversations={conversations}
          loading={messageLoading}
          createMessage={createMessage}
          startMessaging={startMessaging}
          closeStream={closeStream}
          readConversation={readConversation}
          closeConversation={closeConversation}
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
  messageLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  participant: PropTypes.number,
  activeConversation: PropTypes.number,
  conversations: PropTypes.array,
  fullScreen: PropTypes.bool,
  createMessage: PropTypes.func,
  startMessaging: PropTypes.func,
  setFullScreen: PropTypes.func,
  closeStream: PropTypes.func.isRequired,
  readConversation: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired,
};

export default withTheme(VideoStream);
