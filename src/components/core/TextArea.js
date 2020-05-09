import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  padding: 1rem;
  background: transparent;
  width: ${({ full }) => full && '100%'};
  max-width: 100%;
  border-radius: 0.5rem;
  border: ${({ theme }) => `2px solid ${theme.grey.light}`};
  outline: none;
  color: ${({ theme }) => theme.black.light};
  font-size: 1.1rem;
  transition: all 150ms;
`;

export function TextArea({
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
    <StyledTextArea
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

TextArea.propTypes = {
  full: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

TextArea.defaultProps = {
  full: true,
};

export default TextArea;
