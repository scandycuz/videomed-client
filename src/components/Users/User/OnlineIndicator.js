import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalize } from 'util/methods';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function OnlineIndicator({ status }) {
  return (
    <Box direction="row" align="center">
      <Box marginRight="0.5rem">
        <Indicator status={status} />
      </Box>

      <Typography color="grey.dark">
         { capitalize(status) }
      </Typography>
    </Box>
  );
}

OnlineIndicator.propTypes = {
  status: PropTypes.string,
};

OnlineIndicator.defaultProps = {
  status: 'offline',
};

export default OnlineIndicator;

const Indicator = styled.div`
  margin-top: -3px;
  width: 0.925rem;
  height: 0.925rem;
  border-radius: 50%;
  border: ${({ theme, status }) =>
    `4px solid ${status === 'online' ? theme.ok.light : theme.critical.light}`};
`;
