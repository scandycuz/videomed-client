import React from 'react';

function Typography({ as, children }) {
  const Tag = React.createElement(as, {}, children);

  return Tag;
}

Typography.defaultProps = {
  as: 'span',
};

export default Typography;
