import PropTypes from 'prop-types';
import styled from 'styled-components';
import { normalizeColor } from 'util/methods';

const ButtonBase = styled.button`
  background: transparent;
  padding: 0;
  opacity: ${({ fade, opacity }) => fade ? 0.85 : opacity ? opacity : 1};
  font-size: 1.25rem;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  color: ${({ theme, color }) => color ? normalizeColor(theme, color) : undefined};
  transition: 100ms;

  &:hover {
    background: transparent;
    opacity: 1;
  }
`;

ButtonBase.propTypes = {
  fade: PropTypes.bool,
  disabled: PropTypes.bool,
}

ButtonBase.defaultProps = {
  fade: true,
  disabled: false,
}

export default ButtonBase;
