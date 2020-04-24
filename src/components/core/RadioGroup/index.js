import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Box from 'components/core/Box';

export function RadioGroup({ direction, name, value, onChange, children }) {
  function handleChange(e) {
    onChange({
      ...e,
      target: {
        ...e.target,
        value: e.target.value,
        name,
      },
    });
  }

  return (
    <Box
      direction={direction}
      justify={direction === 'column' ? 'center' : undefined}
      align={direction === 'row' ? 'center' : undefined}
    >
      { Children.map(children, child => {
        return cloneElement(child, {
          key: child.props.label,
          checked: child.props.value === value,
          onChange: handleChange,
        });
      })}
    </Box>
  );
}

RadioGroup.propTypes = {
  direction: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  direction: 'row',
};

export default RadioGroup;
