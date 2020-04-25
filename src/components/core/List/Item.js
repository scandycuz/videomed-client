import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';

const Wrapper = styled(Box)`
  background: ${({ theme }) => theme.white};
  padding: 0.75rem 1rem;
  transition: all 150ms;

  &:hover {
    background: ${({ theme }) => theme.grey.light};
  }
`;

export function Item({ children }) {
  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
}

Item.propTypes = {
  children: PropTypes.node,
};

export default Item;
