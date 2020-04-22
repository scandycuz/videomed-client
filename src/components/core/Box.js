import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || props.flexDirection};
  justify-content: ${(props) => props.justify || props.justifyContent};
  align-items: ${(props) => props.align || props.alignItems};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

function Box({ children, ...props }) {
  return (
    <Styled {...props}>
      { children }
    </Styled>
  );
}

Box.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  flexDirection: PropTypes.string,
  justify: PropTypes.string,
  justifyContent: PropTypes.string,
  align: PropTypes.string,
  alignItems: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
};

Box.defaultProps = {
  direction: 'column',
};

export default Box;
