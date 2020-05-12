import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';
import Button from 'components/core/Button';

export function Code({ code }) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((current) => !current);
  }

  return (
    <Box width="100%" align="stretch">
      <Box marginBottom="0.5rem">
        <Button plain round onClick={toggleVisible}>
          <Typography color="black.light" align="center">
            { visible ? (
              'Hide my Physician Identifier'
            ) : (
              'Show my Physician Identifier'
            )}
          </Typography>
        </Button>
      </Box>

      <Typography size="1.75rem" color="grey.dark" align="center">
        <strong>{ visible ? code : code.split('').map(() => '*') }</strong>
      </Typography>

      { visible && (
        <Box marginTop="0.5rem">
          <Typography color="black.light" align="center">
            Give this code to your patients to enable them to create an
            account. Once created, they will appear in the list above and you
            can initiate a call with them.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

Code.propTypes = {
  code: PropTypes.string.isRequired,
}

export default Code;
