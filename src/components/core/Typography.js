import { createElement } from 'react';
import styled from 'styled-components';
import { normalizeColor } from 'util/methods';
import PropTypes from 'prop-types';

const Typography = ({ as, children, ...rest }) => createElement(as, rest, children);

const StyledTypography = styled(Typography)`
  color: ${({ theme, color }) => color ? normalizeColor(theme, color) : theme.black.main};
  line-height: ${({ lineHeight }) => lineHeight || '1.45em'};
  font-size: ${({ size }) => size};
  font-weight: ${({ weight}) => weight};
  text-align: ${({ align }) => align};
`;

Typography.defaultProps = {
  as: 'span',
};

Typography.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
}

export default StyledTypography;
