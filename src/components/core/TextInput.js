import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${({ full }) => full && '100%'};
  padding: 1rem;
  border: none;
  border-radius: 0.35rem;
  font-size: 1rem;
`;

export function TextInput({ full, name, value, type, onChange }) {
  return (
    <StyledInput
      full={full}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
    />
  );
}

TextInput.propTypes = {
  full: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  full: true,
  type: 'text',
};

export default TextInput;
