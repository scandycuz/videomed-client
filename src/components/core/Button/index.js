import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import Base from './Base';

const StyledButton = styled(Base)`
  padding: 0.75rem 1.5rem;
  border-radius: ${({ round }) => round ? '1.5rem' : '8px'};
  color: ${({ color, plain, theme }) =>
    color ? color :
    plain ? theme.secondary.main :
    theme.white};
  background: ${({ background, disabled, plain, critical, theme }) =>
    background ? background :
    disabled ? theme.disabled :
    plain ? 'transparent' :
    critical ? theme.critical.main :
    theme.primary.main};
  width: ${({ full }) => full && '100%'};

  &:hover {
    background: ${({ background, disabled, plain, critical, theme }) =>
      background ? background :
      disabled ? theme.disabled :
      plain ? theme.grey.main :
      critical ? theme.critical.dark :
      theme.primary.dark};
  }
`;

const Button = ({ children, onClick, ...rest }) => {
  return (
    <StyledButton
      onClick={rest.disabled ? undefined : onClick}
      {...rest}
    >
      <Box direction="row" justify="center" align="center">
        { children }
      </Box>
    </StyledButton>
  );
}

Button.propTypes = {
  full: PropTypes.bool,
  disabled: PropTypes.bool,
  plain: PropTypes.bool,
  background: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  full: true,
  plain: false,
  disabled: false,
};

export default Button;
