import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

export function Fade({ duration, timeout, children, ...rest}) {
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { marginBottom: '-4rem', opacity: 0 },
    entered:  { marginBottom: 0, opacity: 1 },
    exiting:  { marginBottom: 0, opacity: 1 },
    exited:  { marginBottom: 0, opacity: 0 },
  };

  return (
    <Transition timeout={timeout} {...rest}>
      { state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
          { children }
        </div>
      )}
    </Transition>
  );
}

Fade.propTypes = {
  duration: PropTypes.number,
  timeout: PropTypes.number,
  inProp: PropTypes.bool,
  children: PropTypes.node,
};

Fade.defaultProps = {
  duration:  800,
  timeout: 0,
  height: '3.5rem',
};

export default Fade;
