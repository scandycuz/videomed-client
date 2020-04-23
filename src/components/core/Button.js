import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  outline: none;
  padding: 0.75rem 1rem;
  border-radius: 2px;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  color: white;
  background: turquoise;
  width: ${({ full }) => full && '100%'}
`;

export function Button({ full, type, onClick, children }) {
  return (
    <StyledButton full={full} type={type} onClick={onClick}>
      { children }
    </StyledButton>
  )
}

Button.propTypes = {
  full: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  full: true,
};

export default Button;
