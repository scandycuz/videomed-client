import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { normalizeColor } from 'util/methods';

export function Link(props) {
  if (props.to) {
    return <RouterLink {...props} />
  }

  return <a {...props} />;
}

Link.propTypes = {
  to: PropTypes.string,
};

const StyledLink = styled(Link)`
  color: ${({ theme, color }) => color ? normalizeColor(theme, color) : 'inherit'};
  text-decoration: none;
`;

export default StyledLink;
