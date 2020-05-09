import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function Message({ body, isOwn }) {
  return(
    <Wrapper isOwn={isOwn}>
      <Typography color={isOwn ? 'white' : 'black.light'}>
        { body }
      </Typography>
    </Wrapper>
  );
}

Message.propTypes = {
  body: PropTypes.string.isRequired,
  isOwn: PropTypes.bool.isRequired,
};

export default Message;

const Wrapper = styled(Box)`
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  background: ${({ theme, isOwn }) => isOwn ? theme.secondary.light : theme.grey.light};
  align-self: ${({ isOwn }) => isOwn ? 'flex-end' : 'flex-start'};
  white-space: pre-line;
`;
