import React from 'react';
import PropTypes from 'prop-types';

function Typography({ as, children }) {
  const Tag = React.createElement(as, {}, children);

  return Tag;
}

Typography.defaultProps = {
  as: 'span',
};

Typography.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
}

export default Typography;
