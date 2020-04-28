import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiPhone } from 'react-icons/fi';

const Shaking = styled.div`
  animation: shake 600ms cubic-bezier(.36,.07,.19,.97) alternate infinite;

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      tranform-origin: center;
    }

    25% {
      transform: rotate(10deg);
      tranform-origin: center;
    }

    50% {
      transform: rotate(0deg);
      tranform-origin: center;
    }

    100% {
      transform: rotate(0deg);
      tranform-origin: center;
    }
  }
`;

export function ShakingPhone({ size }) {
  return (
    <Shaking>
      <FiPhone size={size} />
    </Shaking>
  )
}

ShakingPhone.propTypes = {
  size: PropTypes.string,
}

export default ShakingPhone;
