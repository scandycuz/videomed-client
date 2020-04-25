import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';

export function List({ children }) {
  return (
    <Box borderRadius="6px" overflow="hidden">
      { children }
    </Box>
  );
}

List.propTypes = {
  children: PropTypes.node,
};

export default List;
