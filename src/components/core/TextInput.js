import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 1rem;
  background: transparent;
  width: ${({ full }) => full && '100%'};
  border: none;
  outline: none;
  font-size: 1.1rem;
  transition: all 150ms;
`;

export function TextInput({
  full,
  name,
  value,
  placeholder,
  type,
  onChange,
  onBlur,
  ...rest
}) {
  return (
    <StyledInput
      full={full}
      name={name}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
    />
  );
}

TextInput.propTypes = {
  full: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  full: true,
  type: 'text',
};

export default TextInput;
