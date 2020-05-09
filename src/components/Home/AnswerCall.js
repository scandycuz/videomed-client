import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Box from 'components/core/Box';
import Dialog from 'components/core/Dialog';
import Typography from 'components/core/Typography';
import ShakingPhone from './ShakingPhone';

export function AnswerCall({
  theme,
  user,
  prefix,
  acceptCall,
  rejectCall,
}) {
  return (
    <Dialog
      onSuccess={acceptCall}
      onReject={rejectCall}
    >
      <Box
        direction="row"
        align="center"
        paddingLeft="0.25rem"
      >
        <Box marginRight="1rem">
          <ShakingPhone size="2rem" color={theme.black.light}/>
        </Box>

        <Typography size="1.25rem">
          Accept call from {prefix}{user.firstName} {user.lastName}?
        </Typography>
      </Box>
    </Dialog>
  );
}

AnswerCall.propTypes = {
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  prefix: PropTypes.string,
  acceptCall: PropTypes.func.isRequired,
  rejectCall: PropTypes.func.isRequired,
}

export default withTheme(AnswerCall);
