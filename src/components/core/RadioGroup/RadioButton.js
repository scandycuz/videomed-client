import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function RadioButton({ theme, label, checked, value, onChange }) {
  const Icon = checked ? FiCheckCircle : FiCircle;

  function handleClick(e) {
    e.preventDefault();

    onChange({
      ...e,
      target: {
        ...e.target,
        value,
      }
    })
  }

  return (
    <Box
      padding="0.5rem 0"
      direction="row"
      align="center"
      marginRight="1.5rem"
    >
      <PlainButton onClick={handleClick}>
        <Icon size="1.25rem" color={theme.black.light} />
      </PlainButton>

      <Box marginLeft="0.5rem">
        <Typography color="black.light" size="1.075rem">
          { label }
        </Typography>
      </Box>
    </Box>
  );
}

RadioButton.propTypes = {
  theme: PropTypes.object.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  checked: false,
}

const PlainButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
`;

export default withTheme(RadioButton);
