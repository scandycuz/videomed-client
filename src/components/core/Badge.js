import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import Typography from 'components/core/Typography';

const transitionStyles = {
  entering: { opacity: '0', width: '0', height: '0', },
  entered:  { opacity: '1', width: '24px', height: '24px' },
  exiting:  { opacity: '1', width: '24px', height: '24px' },
  exited:  { opacity: '0', width: '0', height: '0', },
};

export function Badge({ count, children }) {
  return (
    <Wrapper>
      <Outer>
        <Transition in={count > 0} timeout={0}>
          { state => (
            <Count
              opacity={transitionStyles[state].opacity}
              width={transitionStyles[state].width}
              height={transitionStyles[state].height}
            >
              { !!count && (
                <Typography color="white" size="0.95rem">
                  { count }
                </Typography>
              )}
            </Count>
          )}
        </Transition>
      </Outer>

      { children }
    </Wrapper>
  );
}

Badge.propTypes = {
  count: PropTypes.number,
  children: PropTypes.node,
}

export default Badge;

const Wrapper = styled.div`
  position: relative;
`;

const Outer = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 24px;
  height: 24px;
  top: 7px;
  right: 7px;
`;

const Count = styled.div`
  pointer-events: none;
  position: absolute;
  transition: all 300ms ease-in-out;
  transform-origin: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ opacity }) => opacity || 0};
  width: ${({ width }) => width || 0};
  height: ${({ height }) => height || 0};
  background: ${({ theme }) => theme.critical.light};
`;
