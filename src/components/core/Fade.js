import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

export function Fade({ duration, timeout, children, ...rest}) {
  const styles = {
    entering: { marginBottom: '-4rem', opacity: 0 },
    entered:  { marginBottom: 0, opacity: 1 },
    exiting:  { marginBottom: 0, opacity: 0 },
    exited:  { marginBottom: 0, opacity: 0 },
  };

  return (
    <Transition timeout={timeout} {...rest}>
      { (state) => (
        <Fading
          duration={duration}
          opacity={styles[state].opacity}
          marginBottom={styles[state].marginBottom}
        >
          { children }
        </Fading>
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
  duration:  400,
  timeout: 400,
  height: '3.5rem',
};

export default Fade;

const Fading = styled.div`
  transition: ${({ duration }) => `all ${duration}ms ease-in-out`};
  opacity: ${({ opacity }) => opacity || 0};
  margin-bottom: ${({ marginBottom }) => marginBottom || 0};
`;
