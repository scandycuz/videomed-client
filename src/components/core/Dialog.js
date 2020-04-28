import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import Button from 'components/core/Button';

export function Dialog({
    width,
    successText,
    rejectText,
    onSuccess,
    onReject,
    children,
  }) {
  return (
    <Background>
      <Wrapper align="flex-start">
        { children }

        <Box
          marginTop="1.5rem"
          direction="row"
          align="center"
          width={widths[width]}
        >
          <Box marginRight="1.25rem">
            <Button round full={false} onClick={onSuccess}>
              { successText }
            </Button>
          </Box>

          <Button plain round full={false} onClick={onReject}>
            { rejectText }
          </Button>
        </Box>
      </Wrapper>
    </Background>
  );
}

Dialog.propTypes = {
  width: PropTypes.oneOf(['sm', 'md', 'lg']),
  successText: PropTypes.string,
  rejectText: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Dialog.defaultProps = {
  width: 'md',
  successText: 'Accept',
  rejectText: 'Cancel',
};

export default Dialog;

const widths = {
  sm: '24rem',
  md: '28rem',
  lg: '40rem',
};

const Background = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5000;
  align-items: center;
  padding-top: 8rem;
  background: rgba(0, 0, 0, 0.25);
  transition: all 200ms;
`;

const Wrapper = styled(Box)`
  padding: 1.75rem 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  background: ${({ theme }) => theme.white};
`;
