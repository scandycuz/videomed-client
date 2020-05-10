import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import { TransitionGroup } from 'react-transition-group';
import Fade from 'components/core/Fade';
import Message from './Message';

export function GlobalMessages({ messages }) {
  return (
    <Box
      position="fixed"
      justify="center"
      align="center"
      left="0"
      right="0"
      bottom="1.25rem"
      pointerEvents="none"
    >
      <TransitionGroup>
        { messages.map((message, i) => {
          return (
            <Fade
              key={message.body}
              duration={400}
              timeout={400}
            >
              <Box marginBottom={i !== messages.length - 1 && '0.5rem'}>
                <Message message={message.body} />
              </Box>
            </Fade>
          );
        })}
      </TransitionGroup>
    </Box>
  )
}

GlobalMessages.propTypes = {
  messages: PropTypes.array,
}

GlobalMessages.defaultProps = {
  messages: [],
}

export default GlobalMessages;
