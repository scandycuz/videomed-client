import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { FiEye, FiEyeOff } from "react-icons/fi";
import Box from 'components/core/Box';
import TextInput from 'components/core/TextInput';

export function PasswordInput({
  theme,
  full,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
}) {
  const [visible, setVisible] = useState(false);

  function toggleVisible(e) {
    e.preventDefault();

    setVisible((current) => !current);
  }

  const Icon = visible ? FiEyeOff : FiEye;

  return (
    <Box
      direction="row"
      align="center"
      width={full ? '100%' : undefined}
    >
      <TextInput
        full
        name={name}
        value={value}
        placeholder={placeholder}
        type={visible ? 'text' : 'password'}
        onChange={onChange}
        onBlur={onBlur}
      />

      <Box padding="0 0.5rem" marginTop="2px">
        <StyledButton plain onClick={toggleVisible}>
          <Icon size="1.5rem" color={theme.black.light} />
        </StyledButton>
      </Box>
    </Box>
  );
}

PasswordInput.propTypes = {
  theme: PropTypes.object,
  full: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

PasswordInput.defaultProps = {
  full: true,
};

export default withTheme(PasswordInput);

const StyledButton = styled.button`
  opacity: 0.85;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  transition: all 150ms;

  &:hover {
    opacity: 1;
  }
`;
