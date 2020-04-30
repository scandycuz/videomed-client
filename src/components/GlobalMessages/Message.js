import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { FiInfo } from 'react-icons/fi';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function Message({ theme, message, dark }) {
  return (
    <Box
      background={dark ? 'black.light' : 'grey.main'}
      direction="row"
      align="center"
      padding="1rem"
      minWidth="18rem"
      borderRadius="6px"
    >
      <Box marginRight="0.75rem">
        <FiInfo size="1.5rem" color={theme.white} />
      </Box>

      <Typography color={dark ? 'white' : 'black.light'}>
        { message }
      </Typography>
    </Box>
  );
}

Message.propTypes = {
  theme: PropTypes.object.isRequired,
  background: PropTypes.string,
  message: PropTypes.string,
  dark: PropTypes.bool,
}

Message.defaultProps = {
  dark: true,
}

export default withTheme(Message);
