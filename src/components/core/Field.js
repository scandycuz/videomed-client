import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function Field({ label, errors, border, children }) {
  return (
    <Box>
      { label && (
        <Box marginBottom="0.5rem" marginLeft="1.25rem">
          <Typography color="grey.dark">
            { label }
          </Typography>
        </Box>
      )}

      <Wrapper errors={errors} border={border}>
        { children }
      </Wrapper>

      { !!errors.length && (
        <Box marginTop="0.5rem" marginLeft="0.75rem">
          <Typography color="critical">
            { errors.join(', ') }
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Field.propTypes = {
  label: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  border: PropTypes.string,
  children: PropTypes.node,
};

Field.defaultProps = {
  errors: [],
}

export default Field;

const Wrapper = styled(Box)`
  border-radius: 4px;
  border: ${({ theme, errors, border }) =>
    border || `1px solid ${errors.length ? theme.critical.light : theme.grey.main}`};

  &:focus-within {
    border: ${({ theme, errors, border }) =>
      border || `1px solid ${errors.length ? theme.critical.light : theme.primary.dark}`};
  }
`;
