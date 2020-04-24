import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';

export function Container({ width, children }) {
  const widths = {
    xs: '20rem',
    sm: '35rem',
    md: '50rem',
    lg: '62rem',
    xl: '76rem',
  }

  return (
    <Box
      maxWidth={widths[width]}
      width="100%"
      marginLeft="auto"
      marginRight="auto"
    >
      { children }
    </Box>
  );
}

Container.propTypes = {
  width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.node,
};

export default Container;
