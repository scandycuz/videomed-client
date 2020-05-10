import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FiX } from 'react-icons/fi';
import Box from 'components/core/Box';
import Button from 'components/core/Button/Icon';
import MessageList from 'components/Messages/MessageList';
import MessageForm from 'components/Messages/MessageForm';

export function Messages({
  theme,
  currentUser,
  messages,
  activeConversation,
  readConversation,
  onSubmit,
  onClose
}) {
  useEffect(() => {
    readConversation(activeConversation)
  }, [messages])

  return (
    <Box>
      <Box align="flex-end" paddingBottom="0.5rem">
        <Button onClick={onClose}>
          <Box padding="1rem">
            <FiX size="1.75rem" color={theme.black.light} />
          </Box>
        </Button>
      </Box>

      <MessageList
        height="42vh"
        currentUser={currentUser}
        messages={messages}
      />

      <Box padding="1rem 0 0" background="white">
        <MessageForm onSubmit={onSubmit} />
      </Box>
    </Box>
  );
}

Messages.propTypes = {
  theme: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  activeConversation: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  readConversation: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withTheme(Messages);
