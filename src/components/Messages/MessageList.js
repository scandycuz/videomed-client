import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Message from './Message';

export function MessageList({ currentUser, messages }) {
  const end = useRef();
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    end.current.scrollIntoView({
      behavior: initial ? 'auto' : 'smooth',
      block: 'end',
    });

    setInitial(false);
  }, [messages]);

  return (
    <Box
      padding="0 0.75rem 0 0"
      maxHeight="38vh"
      overflowX="auto"
    >
      { messages.length ? (
        messages.map(({ body, user }, idx) => {
          return (
            <Box
              key={idx}
              flex="0 0 auto"
              marginBottom={idx === messages.length - 1 ? '0' : '0.5rem'}
            >
              <Message
                body={body}
                author={user}
                isOwn={currentUser.id === user.id}
              />
            </Box>
          );
        })
      ) : (
        <Box align="center">
          <Typography align="center" color="grey.dark">
            <em>There are currently no Messages</em>
          </Typography>
        </Box>
      )}

      <div ref={end} />
    </Box>
  );
}

MessageList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
}

export default MessageList;
